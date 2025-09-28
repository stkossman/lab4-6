type FilterType = "all" | "active" | "done";

interface TodoFiltersProps {
  activeFilter: FilterType;
  onSetFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

const FilterButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => {
  const activeClass = "bg-neutral-800 text-white";
  const inactiveClass = "bg-neutral-100 text-neutral-600 hover:bg-neutral-200";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-md transition-colors ${isActive ? activeClass : inactiveClass}`}
    >
      {label}
    </button>
  );
};

const TodoFilters: React.FC<TodoFiltersProps> = ({
  activeFilter,
  onSetFilter,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className="flex items-center justify-between p-2">
      <div className="flex items-center gap-2">
        <FilterButton
          label="All"
          isActive={activeFilter === "all"}
          onClick={() => onSetFilter("all")}
        />
        <FilterButton
          label="To Be Done"
          isActive={activeFilter === "active"}
          onClick={() => onSetFilter("active")}
        />
        <FilterButton
          label="Done"
          isActive={activeFilter === "done"}
          onClick={() => onSetFilter("done")}
        />
      </div>

      {hasCompletedTodos && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-neutral-500 hover:text-red-500 hover:underline transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoFilters;
