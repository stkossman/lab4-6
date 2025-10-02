import TodoItem from "./TodoItem";
import TodoEmpty from "./TodoEmpty";
import type { TodoListProps } from "../../../types/todo";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  onEdit,
}) => {
  if (todos.length === 0) {
    return <TodoEmpty />;
  }

  return (
    <ul className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg overflow-hidden">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
};

export default TodoList;
