export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId?: number;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export interface TodoPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  onLimitChange: (limit: number) => void;
}

export interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, newTitle: string) => void;
}

export interface TodoSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export interface TodoFiltersProps {
  activeFilter: FilterType;
  onSetFilter: (filter: FilterType) => void;
  onClearCompleted: () => void;
  hasCompletedTodos: boolean;
}

export type FilterType = "all" | "active" | "done";

export interface UsePaginationProps {
  items: Todo[];
  initialLimit?: number;
  dependencies?: unknown[];
}

export interface UseTodoFiltersProps {
  todos: Todo[];
}