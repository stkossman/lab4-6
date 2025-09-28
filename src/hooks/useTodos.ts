import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Todo } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await fetch(`${API_URL}?limit=10`);
  if (!response.ok) throw new Error("Failed to fetch todos");
  const data = await response.json();
  return data.todos;
};

const updateTodoAPI = async (
  updatedTodo: Pick<Todo, "id" | "completed">
): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${updatedTodo.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed: updatedTodo.completed }),
  });
  if (!response.ok) throw new Error("Failed to update todo");
  return response.json();
};

const deleteTodoAPI = async (id: number): Promise<Todo> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete todo");
  return response.json();
};

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<Todo[], Error>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 5 * 60 * 1000,
  });

  const addTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      todo: todoText,
      completed: false,
    };
    queryClient.setQueryData<Todo[]>(["todos"], (oldTodos = []) => [
      newTodo,
      ...oldTodos,
    ]);
  };

  const { mutate: toggleTodo } = useMutation<Todo, Error, number>({
    mutationFn: (id) => {
      if (id < 1000) {
        const todo = todos.find((t) => t.id === id);
        if (!todo) throw new Error("Todo not found");
        return updateTodoAPI({ id, completed: !todo.completed });
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      return { previousTodos };
    },
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });

  const { mutate: deleteTodo } = useMutation<Todo, Error, number>({
    mutationFn: (id: number) => {
      if (id < 1000) {
        return deleteTodoAPI(id);
      }
      return Promise.resolve({} as Todo);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old = []) =>
        old.filter((t) => t.id !== id)
      );
      return { previousTodos };
    },
    onError: (err, id, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(["todos"], context.previousTodos);
      }
    },
  });

  return {
    todos,
    isLoading,
    error: error?.message,
    addTodo,
    toggleTodo,
    deleteTodo,
  };
};
