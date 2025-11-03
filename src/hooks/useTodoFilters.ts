import { useState, useMemo, useCallback } from "react";
import type { UseTodoFiltersProps } from "../types/todo";

export type FilterType = "all" | "active" | "done";

export const useTodoFilters = ({ todos }: UseTodoFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const statusFilteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "done":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const searchFilteredTodos = useMemo(() => {
    if (!searchTerm.trim()) return statusFilteredTodos;

    return statusFilteredTodos.filter((todo) =>
      todo.todo.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [statusFilteredTodos, searchTerm]);

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  const completedCount = useMemo(
    () => todos.filter((t) => t.completed).length,
    [todos],
  );

  const handleSearchCHange = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleFilterChange = useCallback((newFilter: FilterType) => {
    setFilter(newFilter);
  }, []);

  return {
    searchTerm,
    setSearchTerm: handleSearchCHange,
    filter,
    setFilter: handleFilterChange,
    filteredTodos: searchFilteredTodos,
    activeCount,
    completedCount,
  };
};
