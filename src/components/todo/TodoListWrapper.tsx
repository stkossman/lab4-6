import React, { useState, useMemo } from "react";
import { useTodos } from "../../hooks/useTodos";
import AddTodoForm from "./form/AddTodoForm";
import TodoHeader from "./layout/TodoHeader";
import TodoStats from "./layout/TodoStats";
import TodoList from "./list/TodoList";
import TodoFilters from "./layout/TodoFilters";

type FilterType = "all" | "active" | "done";

const TodoListWrapper: React.FC = () => {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } =
    useTodos();
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

  const activeCount = useMemo(
    () => todos.filter((t) => !t.completed).length,
    [todos],
  );

  const clearCompleted = () => {
    const completedIds = todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.id);
    completedIds.forEach((id) => deleteTodo(id));
  };

  return (
    <section className="max-w-xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-sm p-6 sm:p-8">
      <TodoHeader />
      <AddTodoForm onAdd={addTodo} />

      {isLoading && (
        <p className="text-center text-neutral-500 dark:text-neutral-400 py-8">
          Loading...
        </p>
      )}
      {error && <p className="text-center text-red-500 py-8">Error: {error}</p>}

      {!isLoading && !error && (
        <>
          <TodoFilters
            activeFilter={filter}
            onSetFilter={setFilter}
            onClearCompleted={clearCompleted}
            hasCompletedTodos={todos.some((t) => t.completed)}
          />
          <div className="mt-4">
            <TodoList
              todos={filteredTodos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          </div>
          <TodoStats count={activeCount} />
        </>
      )}
    </section>
  );
};

export default TodoListWrapper;
