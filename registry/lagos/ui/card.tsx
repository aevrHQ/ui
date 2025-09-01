"use client";

import React, { FC, ReactNode, forwardRef } from "react";
import { CloseCircle, MoreCircle } from "iconsax-react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/lagos/ui/button";

// Types
export type CardVariant =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "glass";

export type CardSize = "xs" | "sm" | "md" | "lg" | "xl";

export type CardElevation = "flat" | "raised" | "floating" | "elevated";

export type CardBorder =
  | "default"
  | "bordered"
  | "dashed"
  | "dotted"
  | "borderless";

export interface ActionObject {
  name: string;
  path?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "default" | "primary" | "secondary" | "danger" | "ghost" | "tertiary";
  icon?: ReactNode;
  iconStart?: boolean;
  external?: boolean;
  size?: "sm" | "md" | "lg";
}

// CVA variants for the main card container
const cardVariants = cva(
  "relative overflow-hidden rounded-3xl border transition-all duration-200 dark:bg-gray-900",
  {
    variants: {
      variant: {
        default:
          "border-gray-100 bg-white text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200",
        primary:
          "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
        secondary:
          "border-gray-200 bg-gray-50 text-gray-600 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200",
        success:
          "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200",
        warning:
          "border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
        error:
          "border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200",
        info: "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-200",
        glass:
          "border-white/20 bg-white/10 text-gray-800 backdrop-blur-xl dark:border-gray-700/50 dark:bg-gray-900/10 dark:text-gray-200",
      },
      size: {
        xs: "p-3 text-sm",
        sm: "p-4 text-sm",
        md: "p-6 text-base",
        lg: "p-8 text-lg",
        xl: "p-10 text-xl",
      },
      elevation: {
        flat: "shadow-none",
        raised: "shadow-sm hover:shadow-md",
        floating: "shadow-lg hover:shadow-xl",
        elevated: "shadow-xl hover:shadow-2xl",
      },
      border: {
        default: "",
        bordered: "border-2",
        dashed: "border-2 border-dashed",
        dotted: "border-2 border-dotted",
        borderless: "border-0",
      },
      interactive: {
        true: "cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]",
        false: "",
      },
      hoverable: {
        true: "transition-all duration-200 hover:shadow-lg",
        false: "",
      },
      clickable: {
        true: "cursor-pointer transition-all duration-200 hover:brightness-105 active:brightness-95",
        false: "",
      },
      loading: {
        true: "pointer-events-none opacity-75",
        false: "",
      },
      horizontal: {
        true: "flex flex-row items-start gap-4",
        false: "flex flex-col gap-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      elevation: "flat",
      border: "default",
      interactive: false,
      hoverable: false,
      clickable: false,
      loading: false,
      horizontal: false,
    },
  }
);

// CVA variants for card header
const cardHeaderVariants = cva(
  "mb-1 border-b pb-1 border-gray-100 dark:border-gray-700",
  {
    variants: {
      borderless: {
        true: "border-b-0 pb-0",
        false: "",
      },
      compact: {
        true: "mb-0.5 pb-0.5",
        false: "",
      },
    },
    defaultVariants: {
      borderless: true,
      compact: false,
    },
  }
);

// CVA variants for card title
const cardTitleVariants = cva("font-semibold leading-tight", {
  variants: {
    size: {
      xs: "text-sm font-medium",
      sm: "text-base font-medium",
      md: "text-lg",
      lg: "text-xl font-bold",
      xl: "text-2xl font-bold",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// CVA variants for card subtitle
const cardSubtitleVariants = cva("opacity-75", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// CVA variants for card icon
const cardIconVariants = cva(
  "flex items-center justify-center rounded-2xl mb-4",
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
        glass:
          "bg-white/20 text-gray-600 dark:bg-gray-700/20 dark:text-gray-400",
      },
      size: {
        xs: "h-6 w-6 rounded-lg",
        sm: "h-8 w-8 rounded-xl",
        md: "h-12 w-12",
        lg: "h-16 w-16 rounded-3xl",
        xl: "h-20 w-20 rounded-3xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

// CVA variants for card footer
const cardFooterVariants = cva(
  "border-t pt-2 border-gray-100 dark:border-gray-700",
  {
    variants: {
      borderless: {
        true: "border-t-0 pt-0",
        false: "",
      },
      alignment: {
        left: "flex flex-wrap gap-2",
        right: "flex justify-end gap-2",
        center: "flex justify-center gap-2",
        between: "flex justify-between gap-2",
      },
    },
    defaultVariants: {
      borderless: true,
      alignment: "left",
    },
  }
);

// CVA variants for card media
const cardMediaVariants = cva("overflow-hidden", {
  variants: {
    horizontal: {
      true: "w-24 flex-shrink-0 rounded-2xl",
      false: "-m-6 mb-4 rounded-t-3xl",
    },
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
  },
  compoundVariants: [
    {
      horizontal: true,
      size: "sm",
      className: "w-16 rounded-xl",
    },
    {
      horizontal: true,
      size: "lg",
      className: "w-32 rounded-3xl",
    },
  ],
  defaultVariants: {
    horizontal: false,
    size: "md",
  },
});

// CVA variants for progress bar
const progressBarVariants = cva(
  "absolute left-0 h-1 bg-blue-500 transition-all duration-300",
  {
    variants: {
      position: {
        top: "top-0",
        bottom: "bottom-0",
      },
      thickness: {
        thin: "h-0.5",
        normal: "h-1",
        thick: "h-2",
      },
    },
    defaultVariants: {
      position: "bottom",
      thickness: "normal",
    },
  }
);

// CVA variants for notification dot
const notificationVariants = cva(
  "absolute -right-1 -top-1 h-3 w-3 rounded-full",
  {
    variants: {
      variant: {
        default: "bg-red-500",
        primary: "bg-blue-500",
        success: "bg-green-500",
        warning: "bg-yellow-500",
      },
      size: {
        small: "h-2 w-2",
        normal: "h-3 w-3",
        large: "h-4 w-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "normal",
    },
  }
);

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof cardVariants> {
  // Content
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children?: ReactNode;
  icon?: ReactNode;
  media?: ReactNode;
  badge?: ReactNode;
  badges?: Array<ReactNode>;

  // Actions
  actions?: Array<ActionObject | ReactNode>;
  primaryAction?: ActionObject | ReactNode;
  onClose?: () => void;
  onMore?: () => void;

  // Interactions
  onClick?: () => void;

  // States
  collapsed?: boolean;

  // Header/Footer
  headerBorderless?: boolean;
  footerBorderless?: boolean;
  footerAlignment?: "left" | "right" | "center" | "between";

  // Accessibility
  role?: string;
  tabIndex?: number;

  // Progress
  progress?: number;
  progressPosition?: "top" | "bottom";
  progressThickness?: "thin" | "normal" | "thick";

  // Notification
  notification?: boolean;
  notificationVariant?: "default" | "primary" | "success" | "warning";
  notificationSize?: "small" | "normal" | "large";

  // Link functionality
  href?: string;
  external?: boolean;
}

// Type guard for ActionObject
const isActionObject = (action: unknown): action is ActionObject => {
  return (
    typeof action === "object" &&
    action !== null &&
    !React.isValidElement(action) &&
    "name" in (action as never)
  );
};

// Card Component
const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      children,
      icon,
      media,
      badge,
      badges,
      variant = "default",
      size = "md",
      elevation = "flat",
      border = "default",
      horizontal = false,
      className,
      actions,
      primaryAction,
      onClose,
      onMore,
      interactive = false,
      hoverable = false,
      clickable = false,
      onClick,
      loading = false,
      collapsed = false,
      headerBorderless = true,
      footerBorderless = true,
      footerAlignment = "left",
      role,
      tabIndex,
      progress,
      progressPosition = "bottom",
      progressThickness = "normal",
      notification = false,
      notificationVariant = "default",
      notificationSize = "normal",
      href,
      external = false,
      ...props
    },
    ref
  ) => {
    const getActionSize = (): "sm" | "md" | "lg" => {
      switch (size) {
        case "xs":
        case "sm":
          return "sm";
        case "lg":
        case "xl":
          return "lg";
        default:
          return "md";
      }
    };

    const getActionVariant = (actionType: string) => {
      switch (actionType) {
        case "default":
          return "primary";
        case "primary":
          return "primary";
        case "secondary":
          return "secondary";
        case "tertiary":
          return "tertiary";
        case "ghost":
          return "ghost";
        case "danger":
          return "danger";
        default:
          return "primary";
      }
    };

    // Render action
    const renderAction = (action: ActionObject, index: number) => {
      const variant = getActionVariant(action.type || "default");
      const buttonSize = action.size || getActionSize();

      const content = (
        <>
          {action.icon && action.iconStart && (
            <span className="icon">{action.icon}</span>
          )}
          <span>{action.name}</span>
          {action.icon && !action.iconStart && (
            <span className="icon">{action.icon}</span>
          )}
        </>
      );

      // If path exists, render Link with Button
      if (action.path) {
        if (action.external) {
          return (
            <Button
              key={index}
              asChild
              variant={variant}
              size={buttonSize}
              disabled={action.disabled}
            >
              <a href={action.path} target="_blank" rel="noopener noreferrer">
                {content}
              </a>
            </Button>
          );
        } else {
          return (
            <Button
              key={index}
              asChild
              variant={variant}
              size={buttonSize}
              disabled={action.disabled}
            >
              <Link href={action.path}>{content}</Link>
            </Button>
          );
        }
      }

      // Otherwise render Button with onClick
      return (
        <Button
          key={index}
          variant={variant}
          size={buttonSize}
          onClick={action.onClick}
          disabled={action.disabled}
        >
          {content}
        </Button>
      );
    };

    const renderActionItem = (
      action: ActionObject | ReactNode,
      index: number
    ) => {
      if (isActionObject(action)) {
        return renderAction(action, index);
      }
      return <React.Fragment key={index}>{action}</React.Fragment>;
    };

    const renderPrimaryAction = (action: ActionObject | ReactNode) => {
      if (isActionObject(action)) {
        return renderAction(action, 0);
      }
      return <React.Fragment>{action}</React.Fragment>;
    };

    // Card content
    const cardContent = (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            size,
            elevation,
            border,
            interactive,
            hoverable,
            clickable,
            loading,
            horizontal,
          }),
          className
        )}
        onClick={onClick}
        role={role}
        tabIndex={tabIndex}
        {...props}
      >
        {/* Progress Bar */}
        {progress !== undefined && (
          <div
            className={progressBarVariants({
              position: progressPosition,
              thickness: progressThickness,
            })}
            style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
          />
        )}

        {/* Notification Dot */}
        {notification && (
          <div
            className={notificationVariants({
              variant: notificationVariant,
              size: notificationSize,
            })}
          />
        )}

        {/* Badges */}
        {badges && badges.length > 0 ? (
          <div className="absolute right-3 top-3 z-10 flex flex-wrap justify-end gap-2">
            {badges.map((badge, index) => (
              <div key={index}>{badge}</div>
            ))}
          </div>
        ) : (
          badge && <div className="absolute right-3 top-3 z-10">{badge}</div>
        )}

        {/* Close/More Actions */}
        {(onClose || onMore) && (
          <div className="absolute right-3 top-3 z-10 flex gap-1">
            {onMore && (
              <Button
                onClick={onMore}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="More options"
              >
                <MoreCircle className="h-4 w-4" />
              </Button>
            )}
            {onClose && (
              <Button
                onClick={onClose}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                aria-label="Close"
              >
                <CloseCircle className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}

        {/* Media for horizontal layout */}
        {media && horizontal && (
          <div className={cardMediaVariants({ horizontal: true, size })}>
            {typeof media === "string" ? (
              <img src={media} alt="" className="h-full w-full object-cover" />
            ) : (
              media
            )}
          </div>
        )}

        {/* Main Content Container */}
        <div className="flex h-full flex-1 flex-col gap-2">
          {/* Media for vertical layout */}
          {media && !horizontal && (
            <div className={cardMediaVariants({ horizontal: false })}>
              {typeof media === "string" ? (
                <img
                  src={media}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                media
              )}
            </div>
          )}

          {/* Header */}
          {(title || subtitle || icon) && (
            <div
              className={cardHeaderVariants({
                borderless: headerBorderless,
              })}
            >
              <div className="flex items-start gap-3">
                {icon && (
                  <div className={cardIconVariants({ variant, size })}>
                    {icon}
                  </div>
                )}

                <div className="flex-1">
                  {title && (
                    <h3 className={cardTitleVariants({ size })}>{title}</h3>
                  )}
                  {subtitle && (
                    <p className={cardSubtitleVariants({ size })}>{subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Content */}
          {children && (
            <div
              className={cn(
                "space-y-4",
                collapsed &&
                  "max-h-0 overflow-hidden opacity-0 transition-all duration-300 ease-in-out",
                !collapsed &&
                  "max-h-screen opacity-100 transition-all duration-300 ease-in-out"
              )}
            >
              {children}
            </div>
          )}

          {/* Primary Action */}
          {primaryAction && (
            <div className="mt-4">{renderPrimaryAction(primaryAction)}</div>
          )}

          {/* Footer with Actions */}
          {actions && actions.length > 0 && (
            <div
              className={cn(
                cardFooterVariants({
                  borderless: footerBorderless,
                  alignment: footerAlignment,
                }),
                "mt-auto"
              )}
            >
              {actions.map((action, index) => renderActionItem(action, index))}
            </div>
          )}
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 opacity-100">
            <div className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-medium dark:bg-gray-800">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
              Loading...
            </div>
          </div>
        )}
      </div>
    );

    // Wrap with Link if href is provided
    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-3xl"
          >
            {cardContent}
          </a>
        );
      } else {
        return (
          <Link
            href={href}
            className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-3xl"
          >
            {cardContent}
          </Link>
        );
      }
    }

    return cardContent;
  }
);

Card.displayName = "Card";

// Additional utility components for card layouts
export const CardGrid: FC<{
  children: ReactNode;
  cols?: 1 | 2 | 3 | 4;
  spacing?: "dense" | "normal" | "loose";
  className?: string;
}> = ({ children, cols = 3, spacing = "normal", className }) => {
  const gridClasses = cn(
    "grid",
    {
      "grid-cols-1": cols === 1,
      "grid-cols-1 md:grid-cols-2": cols === 2,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3": cols === 3,
      "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4": cols === 4,
    },
    {
      "gap-4": spacing === "dense",
      "gap-6": spacing === "normal",
      "gap-8": spacing === "loose",
    },
    className
  );

  return <div className={gridClasses}>{children}</div>;
};

export const CardList: FC<{
  children: ReactNode;
  spacing?: "compact" | "normal" | "loose";
  className?: string;
}> = ({ children, spacing = "normal", className }) => {
  const listClasses = cn(
    {
      "space-y-2": spacing === "compact",
      "space-y-4": spacing === "normal",
      "space-y-6": spacing === "loose",
    },
    className
  );

  return <div className={listClasses}>{children}</div>;
};

export const CardSkeleton: FC<{
  size?: CardSize;
  showIcon?: boolean;
  lines?: number;
}> = ({ size = "md", showIcon = false, lines = 3 }) => {
  return (
    <div className={cardVariants({ size, className: "animate-pulse" })}>
      <div className="flex items-start gap-3">
        {showIcon && (
          <div
            className={cn(
              "rounded-full bg-gray-200 dark:bg-gray-700",
              size === "sm" ? "h-8 w-8" : "h-12 w-12"
            )}
          />
        )}
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-200 rounded dark:bg-gray-700 w-2/3" />
          <div className="h-3 bg-gray-200 rounded dark:bg-gray-700 w-1/2" />
        </div>
      </div>
      <div className="space-y-2 mt-4">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "h-3 bg-gray-200 rounded dark:bg-gray-700",
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { Card, cardVariants };
