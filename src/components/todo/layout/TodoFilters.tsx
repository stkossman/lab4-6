import FilterButton from "../../ui/FilterButton";

interface TodoFiltersProps {
  activeFilter: FilterType;
  onSetFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

type FilterType = "all" | "active" | "done";

const TodoFilters: React.FC<TodoFiltersProps> = ({
  activeFilter,
  onSetFilter,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <FilterButton
        label="All"
        isActive={activeFilter === "all"}
        onClick={() => onSetFilter("all")}
      />
      <FilterButton
        label="Active"
        isActive={activeFilter === "active"}
        onClick={() => onSetFilter("active")}
      />
      <FilterButton
        label="Done"
        isActive={activeFilter === "done"}
        onClick={() => onSetFilter("done")}
      />
      {hasCompletedTodos && (
        <button
          onClick={onClearCompleted}
          className="px-4 py-2 text-sm rounded-md transition-colors bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800"
        >
          Clear completed
        </button>
      )}
    </div>
  );
};

export default TodoFilters;
