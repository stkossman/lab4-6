import { useMemo } from 'react';
import { useTodoData } from './useTodoData';
import { useTodoFilters } from './useTodoFilters';
import { usePagination } from './usePagination';
import { useTodoMutations } from './useTodoMutations';

export const useTodos = () => {
  const { allTodos, isLoading, error } = useTodoData();

  const { 
    addTodo, 
    toggleTodo, 
    deleteTodo, 
    editTodoTitle,
    filterDeletedTodos 
  } = useTodoMutations();

  const todosWithoutDeleted = useMemo(
    () => filterDeletedTodos(allTodos),
    [allTodos, filterDeletedTodos]
  );

  const {
    searchTerm,
    setSearchTerm,
    filter,
    setFilter,
    filteredTodos,
    activeCount,
    completedCount,
  } = useTodoFilters({ todos: todosWithoutDeleted });
  
  const {
    currentPage,
    limitPerPage,
    totalItems: totalTodos,
    paginatedItems: paginatedTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,
    setCurrentPage,
  } = usePagination({ 
    items: filteredTodos,
    dependencies: [searchTerm, filter]
  });

  const addTodoWithReset = (todoText: string) => {
    addTodo(todoText);
    setCurrentPage(1);
  };
  
  return {
    todos: paginatedTodos,
    isLoading,
    error,

    addTodo: addTodoWithReset,
    toggleTodo,
    deleteTodo,
    editTodoTitle,

    currentPage,
    limitPerPage,
    totalTodos,
    goToNextPage,
    goToPrevPage,
    setLimit,

    searchTerm,
    setSearchTerm,
    filter,
    setFilter,

    activeCount,
    completedCount,
  };
};
