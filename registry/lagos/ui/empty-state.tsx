// ./registry/lagos/ui/empty-state.tsx

"use client";

import React, { FC, ReactNode } from "react";
import {
  Card as CardIcon,
  Document,
  ArrowRight,
  SearchNormal1,
  Box1,
} from "iconsax-react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/lagos/ui/button";

// CVA variants for EmptyState container
const emptyStateVariants = cva(
  "relative flex flex-col items-center justify-center text-center rounded-3xl transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border border-gray-200 bg-gray-50/50 dark:border-gray-800 dark:bg-gray-900/50",
        primary:
          "border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50",
        secondary:
          "border border-gray-200 bg-gray-100/50 dark:border-gray-700 dark:bg-gray-800/50",
        success:
          "border border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/50",
        warning:
          "border border-yellow-200 bg-yellow-50/50 dark:border-yellow-800 dark:bg-yellow-950/50",
        error:
          "border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/50",
        info: "border border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/50",
        ghost: "border-0 bg-transparent",
      },
      size: {
        sm: "p-6 gap-3",
        md: "p-8 gap-4",
        lg: "p-12 gap-6",
        xl: "p-16 gap-8",
      },
      layout: {
        vertical: "flex-col items-center text-center",
        horizontal: "md:flex-row md:items-start md:text-left",
      },
      bordered: {
        true: "",
        false: "border-0",
      },
      dashed: {
        true: "border-dashed",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      layout: "vertical",
      bordered: true,
      dashed: false,
    },
  }
);

// CVA variants for icon container
const iconContainerVariants = cva(
  "flex items-center justify-center rounded-full shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        primary:
          "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
        secondary:
          "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
        success:
          "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400",
        warning:
          "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400",
        error: "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400",
        info: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400",
        ghost:
          "bg-gray-100/50 text-gray-600 dark:bg-gray-800/50 dark:text-gray-400",
      },
      size: {
        sm: "h-12 w-12",
        md: "h-16 w-16",
        lg: "h-20 w-20",
        xl: "h-24 w-24",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// CVA variants for text content
const titleVariants = cva("font-semibold", {
  variants: {
    variant: {
      default: "text-gray-900 dark:text-gray-100",
      primary: "text-blue-900 dark:text-blue-100",
      secondary: "text-gray-900 dark:text-gray-100",
      success: "text-green-900 dark:text-green-100",
      warning: "text-yellow-900 dark:text-yellow-100",
      error: "text-red-900 dark:text-red-100",
      info: "text-blue-900 dark:text-blue-100",
      ghost: "text-gray-900 dark:text-gray-100",
    },
    size: {
      sm: "text-base",
      md: "text-lg",
      lg: "text-xl",
      xl: "text-2xl",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

const descriptionVariants = cva("text-muted-foreground max-w-md", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// Types
export type EmptyStateVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "ghost";

export type EmptyStateSize = "sm" | "md" | "lg" | "xl";

export type EmptyStateLayout = "vertical" | "horizontal";

interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "tertiary"
    | "ghost"
    | "danger";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  external?: boolean;
  disabled?: boolean;
}

export interface EmptyStateProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof emptyStateVariants> {
  // Content
  title?: string | ReactNode;
  description?: string | ReactNode;
  icon?: ReactNode;

  // Actions
  primaryAction?: ActionButton | ReactNode;
  secondaryAction?: ActionButton | ReactNode;
  actions?: Array<ActionButton | ReactNode>;

  // Additional content
  illustration?: ReactNode;
  children?: ReactNode;

  // Styling
  fullHeight?: boolean;
  minHeight?: string;
}

// Preset configurations
const presetConfigs = {
  "card-apply": {
    variant: "primary" as const,
    icon: <CardIcon className="h-6 w-6" variant="Bulk" color="currentColor" />,
    title: "Apply for a New Card",
    description:
      "Get started with a new debit card to manage your finances better",
    dashed: true,
  },
  transactions: {
    variant: "ghost" as const,
    icon: <Document className="h-6 w-6" variant="Bulk" color="currentColor" />,
    title: "No transactions yet",
    description:
      "Your transactions will appear here once you start using your card",
    bordered: false,
  },
  "card-payment": {
    variant: "error" as const,
    icon: <CardIcon className="h-6 w-6" variant="Bulk" color="currentColor" />,
    title: "Complete Payment Required",
    description: "Your card order is ready, complete the payment to proceed",
  },
  "no-results": {
    variant: "default" as const,
    icon: (
      <SearchNormal1 className="h-6 w-6" variant="Bulk" color="currentColor" />
    ),
    title: "No results found",
    description:
      "Try adjusting your search or filter to find what you're looking for",
  },
  "no-data": {
    variant: "default" as const,
    icon: <Box1 className="h-6 w-6" variant="Bulk" color="currentColor" />,
    title: "No data available",
    description: "There's nothing to display at the moment",
  },
};

// Type guard for ActionButton
const isActionButton = (action: unknown): action is ActionButton => {
  return (
    typeof action === "object" &&
    action !== null &&
    !React.isValidElement(action) &&
    "label" in (action as ActionButton)
  );
};

const EmptyState: FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  variant = "default",
  size = "md",
  layout = "vertical",
  bordered = true,
  dashed = false,
  primaryAction,
  secondaryAction,
  actions,
  illustration,
  children,
  className,
  fullHeight = false,
  minHeight,
  ...props
}) => {
  // Render action button
  const renderActionButton = (
    action: ActionButton | ReactNode,
    key: string
  ) => {
    if (isActionButton(action)) {
      const content = (
        <>
          {action.icon && action.iconPosition === "start" && action.icon}
          <span>{action.label}</span>
          {action.icon && action.iconPosition !== "start" && action.icon}
        </>
      );

      if (action.href) {
        return (
          <Button
            key={key}
            asChild
            variant={action.variant || "primary"}
            size={action.size || (size === "xl" ? "lg" : size)}
            disabled={action.disabled}
          >
            {action.external ? (
              <a href={action.href} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <Link href={action.href}>{content}</Link>
            )}
          </Button>
        );
      }

      return (
        <Button
          key={key}
          variant={action.variant || "primary"}
          size={action.size || (size === "xl" ? "lg" : size)}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {content}
        </Button>
      );
    }

    return <React.Fragment key={key}>{action}</React.Fragment>;
  };

  return (
    <div
      className={cn(
        emptyStateVariants({ variant, size, layout, bordered, dashed }),
        fullHeight && "min-h-[400px]",
        className
      )}
      style={{ minHeight }}
      {...props}
    >
      {/* Icon */}
      {icon && (
        <div className={iconContainerVariants({ variant, size })}>{icon}</div>
      )}

      {/* Illustration */}
      {illustration && !icon && (
        <div className="flex items-center justify-center">{illustration}</div>
      )}

      {/* Text Content */}
      {(title || description) && (
        <div className={cn("space-y-2", layout === "horizontal" && "flex-1")}>
          {title && (
            <h3 className={titleVariants({ variant, size })}>{title}</h3>
          )}
          {description && (
            <p className={descriptionVariants({ size })}>{description}</p>
          )}
        </div>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction || actions) && (
        <div
          className={cn(
            "flex flex-wrap gap-3",
            layout === "vertical" && "justify-center",
            layout === "horizontal" && "md:justify-start"
          )}
        >
          {primaryAction && renderActionButton(primaryAction, "primary")}
          {secondaryAction && renderActionButton(secondaryAction, "secondary")}
          {actions?.map((action, index) =>
            renderActionButton(action, `action-${index}`)
          )}
        </div>
      )}

      {/* Custom children */}
      {children}
    </div>
  );
};

// Preset components
export const CardApplyEmpty: FC<Partial<EmptyStateProps>> = (props) => {
  const config = presetConfigs["card-apply"];
  return (
    <EmptyState
      {...config}
      primaryAction={{
        label: "Apply Now",
        href: "https://paycard.100pay.co/",
        external: true,
        icon: (
          <ArrowRight className="h-4 w-4" variant="Bulk" color="currentColor" />
        ),
        iconPosition: "end",
      }}
      {...props}
    />
  );
};

export const TransactionsEmpty: FC<Partial<EmptyStateProps>> = (props) => {
  const config = presetConfigs["transactions"];
  return <EmptyState {...config} {...props} />;
};

export const CardPaymentEmpty: FC<Partial<EmptyStateProps>> = (props) => {
  const config = presetConfigs["card-payment"];
  return <EmptyState {...config} {...props} />;
};

export const NoResultsEmpty: FC<Partial<EmptyStateProps>> = (props) => {
  const config = presetConfigs["no-results"];
  return (
    <EmptyState
      {...config}
      secondaryAction={{
        label: "Clear filters",
        variant: "ghost",
      }}
      {...props}
    />
  );
};

export const NoDataEmpty: FC<Partial<EmptyStateProps>> = (props) => {
  const config = presetConfigs["no-data"];
  return <EmptyState {...config} {...props} />;
};

EmptyState.displayName = "EmptyState";

export { EmptyState, emptyStateVariants };
export default EmptyState;
