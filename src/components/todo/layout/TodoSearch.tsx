import type { TodoSearchProps } from "../../../types/todo";

const TodoSearch: React.FC<TodoSearchProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search todos..."
        className="w-full p-3 text-lg bg-transparent border-b-2 text-neutral-800 dark:text-white border-neutral-200 dark:border-neutral-600 focus:border-neutral-400 dark:focus:border-neutral-400 focus:outline-none transition-colors"
      />
    </div>
  );
};

export default TodoSearch;
