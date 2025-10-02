import React, { useState, useMemo } from "react";
import { useTodos } from "../../hooks/useTodos";
import AddTodoForm from "./form/AddTodoForm";
import TodoHeader from "./layout/TodoHeader";
import TodoList from "./list/TodoList";
import TodoFilters from "./layout/TodoFilters";
import TodoSearch from "./layout/TodoSearch";
import TodoPagination from "./layout/TodoPagination";

type FilterType = "all" | "active" | "done";

const TodoListWrapper: React.FC = () => {
  const {
    todos,
    isLoading,
    error,
    addTodo,
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
  } = useTodos();

  const [filter, setFilter] = useState<FilterType>("all");

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "done":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  const clearCompleted = () => {
    const completedIds = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    completedIds.forEach((id) => deleteTodo(id));
  };

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6">
      {isLoading && (
        <div className="text-center text-neutral-500 dark:text-neutral-400 py-8">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-center text-red-500 py-8">Error: {error}</div>
      )}
      {!isLoading && !error && (
        <>
          <TodoHeader />
          <AddTodoForm onAdd={addTodo} />
          <TodoSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <TodoFilters
            activeFilter={filter}
            onSetFilter={setFilter}
            onClearCompleted={clearCompleted}
            hasCompletedTodos={todos.some((t) => t.completed)}
          />
          <TodoList
            todos={filteredTodos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodoTitle}
          />
          <TodoPagination
            currentPage={currentPage}
            totalItems={totalTodos}
            itemsPerPage={limitPerPage}
            onNextPage={goToNextPage}
            onPrevPage={goToPrevPage}
            onLimitChange={setLimit}
          />
        </>
      )}
    </div>
  );
};

export default TodoListWrapper;
