import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "secondary",
  size = "md",
  className = "",
  children,
  disabled,
  ...props
}) => {
  const baseClass =
    "rounded-md transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-neutral-400";

  const variantClasses = {
    primary:
      "bg-neutral-800 dark:bg-neutral-200 text-white dark:text-black hover:bg-neutral-700 dark:hover:bg-neutral-300",
    secondary:
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600",
    danger:
      "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-800",
    ghost:
      "bg-transparent text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const disabledClass = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-neutral-100 dark:hover:bg-neutral-700"
    : "";

  return (
    <button
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
