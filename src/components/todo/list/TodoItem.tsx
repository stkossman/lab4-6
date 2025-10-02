import { useState } from "react";
import Button from "../../ui/Button";
import type { TodoItemProps } from "../../../types/todo";

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);

  const handleToggle = () => {
    onToggle(todo.id);
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() && editValue !== todo.todo) {
      onEdit(todo.id, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.todo);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="group flex items-center gap-3 p-3 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        className="w-5 h-5 rounded border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200 focus:ring-2 focus:ring-neutral-400 cursor-pointer"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 text-neutral-800 dark:text-white bg-neutral-100 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600 rounded focus:outline-none focus:ring-2 focus:ring-neutral-400"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 text-neutral-800 dark:text-white ${
            todo.completed
              ? "line-through text-neutral-400 dark:text-neutral-500"
              : ""
          }`}
        >
          {todo.todo}
        </span>
      )}
      
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {isEditing ? (
          <>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Save
            </Button>
            <Button variant="secondary" size="sm" onClick={handleCancel}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button variant="secondary" size="sm" onClick={handleEdit}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              Delete
            </Button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
