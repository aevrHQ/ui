// ./registry/lagos/ui/button.tsx

"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex w-fit transform cursor-pointer items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:brightness-90 disabled:active:scale-100 focus:ring-offset-white dark:focus:ring-offset-gray-800`,
  {
    variants: {
      variant: {
        default:
          "bg-slate-500 text-slate-50 hover:bg-slate-600 focus:ring-slate-500 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-600",
        primary:
          "bg-blue-500 text-blue-50 hover:bg-blue-600 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-600",
        secondary:
          "border border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100 focus:ring-gray-600 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600",
        tertiary:
          "bg-blue-100 text-blue-600 hover:bg-blue-200 focus:ring-blue-500 dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700 dark:focus:ring-blue-600",
        ghost:
          "bg-transparent text-red-600 hover:bg-red-50 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-950/50 dark:focus:ring-red-600",
        danger:
          "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
        "warning-variant":
          "bg-yellow-500 text-yellow-50 hover:bg-yellow-600 focus:ring-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-600",
        "success-variant":
          "bg-green-500 text-green-50 hover:bg-green-600 focus:ring-green-500 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-600",
        "info-variant":
          "bg-sky-500 text-sky-50 hover:bg-sky-600 focus:ring-sky-500 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-600",
        "error-variant":
          "bg-red-500 text-red-50 hover:bg-red-600 focus:ring-red-500 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-600",
      },
      size: {
        sm: "px-2 py-1.5 text-sm rounded-lg",
        md: "px-3 py-2 text-base",
        lg: "px-6 py-3 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
