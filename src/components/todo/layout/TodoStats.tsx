import type { TodoStatsProps } from "../../../types/todo";

const TodoStats: React.FC<TodoStatsProps> = ({ count }) => {
  return (
    <div className="pt-4 mt-4 border-t border-neutral-200 text-center">
      <p className="text-sm text-neutral-500">
        {count} task{count !== 1 ? "s" : ""} remaining
      </p>
    </div>
  );
};

export default TodoStats;
