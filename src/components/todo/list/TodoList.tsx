import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";
import type { Todo } from "../../../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  if (todos.length === 0) {
    return <TodoEmpty />;
  }

  return (
    <div className="space-y-1">
      {todos.map((todo) => (
        <TodoItem 
            key={todo.id} 
            todo={todo} 
            onToggle={onToggle} 
            onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default TodoList;
