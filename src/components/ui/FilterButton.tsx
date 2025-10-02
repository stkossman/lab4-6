import React from "react";

export interface FilterButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
  className = "",
}) => {
  const activeClass =
    "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black";
  const inactiveClass =
    "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600";

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm rounded-md transition-colors ${
        isActive ? activeClass : inactiveClass
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default FilterButton;
