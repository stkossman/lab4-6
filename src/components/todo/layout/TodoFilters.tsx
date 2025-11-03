import { memo, useCallback } from "react";
import FilterButton from "../../ui/FilterButton";
import type { TodoFiltersProps } from "../../../types/todo";

const TodoFilters: React.FC<TodoFiltersProps> = ({
  activeFilter,
  onSetFilter,
  onClearCompleted,
  hasCompletedTodos,
}) => {
  const handleAllFilter = useCallback(() => onSetFilter("all"), [onSetFilter]);
  const handleActiveFilter = useCallback(
    () => onSetFilter("active"),
    [onSetFilter],
  );
  const handleDoneFilter = useCallback(
    () => onSetFilter("done"),
    [onSetFilter],
  );

  return (
    <div className="flex gap-2 mb-4 flex-wrap">
      <FilterButton
        label="All"
        isActive={activeFilter === "all"}
        onClick={handleAllFilter}
      />
      <FilterButton
        label="Active"
        isActive={activeFilter === "active"}
        onClick={handleActiveFilter}
      />
      <FilterButton
        label="Done"
        isActive={activeFilter === "done"}
        onClick={handleDoneFilter}
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

export default memo(TodoFilters);
