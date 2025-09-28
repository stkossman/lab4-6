export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface TodoStatsProps {
  count: number;
}
