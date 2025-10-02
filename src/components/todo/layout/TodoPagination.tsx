import Button from "../../ui/Button";
import type { TodoPaginationProps } from "../../../types/todo";

const TodoPagination: React.FC<TodoPaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onNextPage,
  onPrevPage,
  onLimitChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-6 space-y-4 font-didact">
      <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
        <span>
          Showing {startItem}-{endItem} of {totalItems} items
        </span>
        <select
          value={itemsPerPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-800 dark:text-white border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400 cursor-pointer"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
          <option value={30}>30 per page</option>
        </select>
      </div>

      <div className="flex items-center justify-center gap-4">
        <Button
          variant="secondary"
          size="md"
          onClick={onPrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className="text-sm font-medium text-neutral-800 dark:text-white">
          {currentPage} of {totalPages}
        </span>
        <Button
          variant="secondary"
          size="md"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TodoPagination;
