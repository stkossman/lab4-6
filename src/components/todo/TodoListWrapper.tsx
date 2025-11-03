import { useCallback, useMemo } from "react";
import { useTodos } from "../../hooks/useTodos";
import AddTodoForm from "./form/AddTodoForm";
import TodoList from "./list/TodoList";
import TodoFilters from "./layout/TodoFilters";
import TodoSearch from "./layout/TodoSearch";
import TodoPagination from "./layout/TodoPagination";

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
    filter,
    setFilter,
    completedCount,
  } = useTodos();

  const clearCompleted = useCallback(() => {
    const completedTodos = todos.filter((todo) => todo.completed);
    completedTodos.forEach((todo) => deleteTodo(todo.id));
  }, [todos, deleteTodo]);

  const hasCompletedTodos = useMemo(() => completedCount > 0, [completedCount]);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {isLoading && (
        <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          Error: {error}
        </div>
      )}
      {!isLoading && !error && (
        <>
          <AddTodoForm onAdd={addTodo} />
          <TodoSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <TodoFilters
            activeFilter={filter}
            onSetFilter={setFilter}
            onClearCompleted={clearCompleted}
            hasCompletedTodos={hasCompletedTodos}
          />
          <TodoList
            todos={todos}
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
