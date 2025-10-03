import axios from 'axios';
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Todo, TodosResponse } from "../types/todo";

const API_URL = "https://dummyjson.com/todos";

export const fetchAllTodos = async (): Promise<TodosResponse> => {
  const response = await axios.get(`${API_URL}?limit=0`);
  return response.data;
};

export const updateTodoAPI = async (updatedTodo: Pick<Todo, 'id' | 'completed'>): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${updatedTodo.id}`, {
    completed: updatedTodo.completed,
  });
  return response.data;
};

export const editTodoTitleAPI = async (id: number, title: string): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${id}`, {
    todo: title,
  });
  return response.data;
};

export const deleteTodoAPI = async (id: number): Promise<Todo> => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const useTodoData = () => {
  const queryClient = useQueryClient();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchAllTodos,
    staleTime: 5 * 60 * 1000,
  });
  
  const allTodos = data?.todos || [];
  
  return {
    allTodos,
    isLoading,
    error: error?.message,
    queryClient,
  };
};
