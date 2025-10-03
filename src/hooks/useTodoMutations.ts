import { useRef } from 'react';
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo, TodosResponse } from "../types/todo";
import { updateTodoAPI, editTodoTitleAPI, deleteTodoAPI } from './useTodoData';

export const useTodoMutations = () => {
  const queryClient = useQueryClient();
  const deletedIdsRef = useRef<Set<number>>(new Set());

  const addTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      userId: 1,
    };
    
    queryClient.setQueryData(['todos'], (oldData: TodosResponse | undefined) => {
      if (!oldData) return { todos: [newTodo], total: 1, skip: 0, limit: 0 };
      return {
        ...oldData,
        todos: [newTodo, ...oldData.todos],
        total: oldData.total + 1,
      };
    });
  };

  const { mutate: toggleTodo } = useMutation({
    mutationFn: (id: number) => {
      if (id < 1000) {
        const allTodos = queryClient.getQueryData<TodosResponse>(['todos']);
        const todo = allTodos?.todos.find((t) => t.id === id && !deletedIdsRef.current.has(t.id));
        if (!todo) throw new Error("Todo not found");
        return updateTodoAPI({ id, completed: !todo.completed });
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
        };
      });
      
      return { previousTodos };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });

  const { mutate: editTodoTitle } = useMutation({
    mutationFn: ({ id, newTitle }: { id: number; newTitle: string }) => {
      if (id < 1000) {
        return editTodoTitleAPI(id, newTitle);
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async ({ id, newTitle }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map(t => t.id === id ? { ...t, todo: newTitle } : t)
        };
      });
      
      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });

  const { mutate: deleteTodo } = useMutation({
    mutationFn: (id: number) => {
      if (id < 1000) {
        return deleteTodoAPI(id);
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async (id) => {
      deletedIdsRef.current.add(id);
      
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter((t) => t.id !== id),
          total: old.total - 1,
        };
      });
      
      return { previousTodos };
    },
    onError: (_err, id, context) => {
      deletedIdsRef.current.delete(id);
      
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });

  const filterDeletedTodos = (todos: Todo[]) => {
    return todos.filter(todo => !deletedIdsRef.current.has(todo.id));
  };
  
  return {
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoTitle: (id: number, newTitle: string) => editTodoTitle({ id, newTitle }),
    filterDeletedTodos,
  };
};
