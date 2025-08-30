"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "danger"
    | "warning-variant"
    | "success-variant"
    | "info-variant"
    | "error-variant";
  size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Base button styles
    const baseStyles =
      "inline-flex w-fit transform cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-90 disabled:active:scale-100";

    // Variant styles
    const variantStyles = {
      default:
        "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
      primary:
        "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
      secondary:
        "border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600",
      tertiary:
        "bg-red-100 text-red-600 hover:bg-red-200 focus:ring-red-500 dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700 dark:focus:ring-red-600",
      ghost:
        "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-950/50 dark:focus:ring-red-600",
      danger:
        "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
      "warning-variant":
        "bg-yellow-500 text-yellow-50 hover:bg-yellow-600 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-600",
      "success-variant":
        "bg-green-500 text-green-50 hover:bg-green-600 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600",
      "info-variant":
        "bg-blue-500 text-blue-50 hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600",
      "error-variant":
        "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
    };

    // Size styles
    const sizeStyles = {
      sm: "px-2 py-1.5 text-sm",
      md: "px-3 py-2 text-base",
      lg: "px-6 py-3 text-xl",
    };

    // Focus ring offset styles (adjusts for light/dark mode)
    const focusOffsetStyles =
      "focus:ring-offset-white dark:focus:ring-offset-gray-800";

    return (
      <Comp
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          focusOffsetStyles,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button };
