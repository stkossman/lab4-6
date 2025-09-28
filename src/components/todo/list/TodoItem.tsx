import type { TodoItemProps } from "../../../types/todo";

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className="group flex items-center justify-between p-4 bg-transparent border-b border-neutral-200 last:border-b-0">
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="w-6 h-6 rounded-full border-2 text-neutral-500 border-neutral-300 focus:ring-neutral-400 focus:ring-offset-2"
        />
        <span
          className={`text-lg transition-colors ${
            todo.completed ? "line-through text-neutral-400" : "text-neutral-700"
          }`}
        >
          {todo.todo}
        </span>
      </div>
      <button
        onClick={handleDelete}
        className="text-neutral-400 opacity-0 group-hover:opacity-100 hover:text-red-500 transition-all"
        aria-label={`Delete task: ${todo.todo}`}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
