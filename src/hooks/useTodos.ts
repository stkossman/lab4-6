import axios from "axios";
import { useState, useMemo, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

const fetchAllTodos = async (): Promise<TodosResponse> => {
  const response = await axios.get(`${API_URL}?limit=0`);
  return response.data;
};

const updateTodoAPI = async (
  updatedTodo: Pick<Todo, "id" | "completed">,
): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${updatedTodo.id}`, {
    completed: updatedTodo.completed,
  });
  return response.data;
};

const editTodoTitleAPI = async (id: number, title: string): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${id}`, {
    todo: title,
  });
  return response.data;
};

const deleteTodoAPI = async (id: number): Promise<Todo> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

interface MutationContext {
  previousTodos: TodosResponse | undefined;
}

export const useTodos = () => {
  const queryClient = useQueryClient();

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);

  const [searchTerm, setSearchTerm] = useState("");

  const deletedIdsRef = useRef<Set<number>>(new Set());

  const { data, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchAllTodos,
    staleTime: 5 * 60 * 1000,
  });

  const allTodos = data?.todos || [];
  const apiTotal = data?.total || 0;

  const todosWithoutDeleted = useMemo(() => {
    return allTodos.filter((todo) => !deletedIdsRef.current.has(todo.id));
  }, [allTodos]);

  const searchFilteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return todosWithoutDeleted;

    return todosWithoutDeleted.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [todosWithoutDeleted, searchTerm]);

  const totalTodos = searchFilteredTodos.length;

  const paginatedTodos = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    const endIndex = startIndex + limitPerPage;
    return searchFilteredTodos.slice(startIndex, endIndex);
  }, [searchFilteredTodos, currentPage, limitPerPage]);

  const totalPages = Math.ceil(totalTodos / limitPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const setLimit = (limit: number) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  const addTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
      userId: 1,
    };

    queryClient.setQueryData(
      ["todos"],
      (oldData: TodosResponse | undefined) => {
        if (!oldData) return { todos: [newTodo], total: 1, skip: 0, limit: 0 };
        return {
          ...oldData,
          todos: [newTodo, ...oldData.todos],
          total: oldData.total + 1,
        };
      },
    );

    setCurrentPage(1);
  };

  const { mutate: toggleTodo } = useMutation({
    mutationFn: (id: number) => {
      if (id < 1000) {
        const todo = todosWithoutDeleted.find((t) => t.id === id);
        if (!todo) throw new Error("Todo not found");
        return updateTodoAPI({ id, completed: !todo.completed });
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t,
          ),
        };
      });

      return { previousTodos };
    },
    onError: (_err, _id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
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
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.map((t) =>
            t.id === id ? { ...t, todo: newTitle } : t,
          ),
        };
      });

      return { previousTodos };
    },
    onError: (_err, _variables, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
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

      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old: TodosResponse | undefined) => {
        if (!old) return old;
        return {
          ...old,
          todos: old.todos.filter((t) => t.id !== id),
          total: old.total - 1,
        };
      });

      const remainingTodosCount = todosWithoutDeleted.length - 1;
      const startIndex = (currentPage - 1) * limitPerPage;

      if (startIndex >= remainingTodosCount && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      }

      return { previousTodos };
    },
    onError: (_err, id, context) => {
      deletedIdsRef.current.delete(id);

      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });

  return {
    todos: paginatedTodos,
    isLoading,
    error: error?.message,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodoTitle: (id: number, newTitle: string) =>
      editTodoTitle({ id, newTitle }),
    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
    searchTerm,
    setSearchTerm,
  };
};
