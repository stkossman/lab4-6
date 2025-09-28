import React from 'react';
import { useTodos } from '../../hooks/useTodos';
import AddTodoForm from './form/AddTodoForm';
import TodoHeader from './layout/TodoHeader';
import TodoStats from './layout/TodoStats';
import TodoList from './list/TodoList';

const TodoListWrapper: React.FC = () => {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <section className="max-w-xl mx-auto bg-white rounded-lg shadow-sm p-6 sm:p-8">
      <TodoHeader />
      <AddTodoForm onAdd={addTodo} />
      
      {isLoading && <p className="text-center text-neutral-500 py-8">Loading...</p>}
      {error && <p className="text-center text-red-500 py-8">Error: {error}</p>}
      
      {!isLoading && !error && (
        <>
          <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
          <TodoStats count={todos.filter(t => !t.completed).length} />
        </>
      )}
    </section>
  );
};

export default TodoListWrapper;
