// ./registry/lagos/ui/info-box.tsx
"use client";

import {
  TickCircle,
  CloseCircle,
  Danger,
  InfoCircle,
  Warning2,
  Information,
} from "iconsax-react";
import Link from "next/link";
import React, { FC, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/lagos/ui/button";
import Loader from "@/registry/lagos/ui/loader";

// Types for InfoBox
export type InfoBoxType =
  | "warning"
  | "error"
  | "success"
  | "info"
  | "loading"
  | "default";

export type InfoBoxSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface ActionObject {
  name: string;
  path?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "default" | "primary" | "secondary" | "danger" | "ghost" | "tertiary";
  icon?: ReactNode;
  iconStart?: boolean;
  custom?: boolean;
}

// CVA variants for the main container
const infoBoxVariants = cva(
  "relative flex grow flex-wrap items-start border transition-colors duration-200",
  {
    variants: {
      type: {
        default: "",
        warning: "",
        error: "",
        success: "",
        info: "",
        loading: "",
      },
      size: {
        xs: "gap-2 rounded-xl p-2",
        sm: "gap-3 rounded-2xl p-3",
        md: "gap-4 rounded-3xl p-5 max-md:flex-col max-md:gap-2 max-md:p-3",
        lg: "gap-5 rounded-3xl p-6",
        xl: "gap-6 rounded-3xl p-8",
        "2xl": "gap-8 rounded-3xl p-10",
      },
      colorScheme: {
        default:
          "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100",
        full: "",
      },
    },
    compoundVariants: [
      // Full color scheme variants
      {
        type: "warning",
        colorScheme: "full",
        className:
          "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100",
      },
      {
        type: "error",
        colorScheme: "full",
        className:
          "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100",
      },
      {
        type: "success",
        colorScheme: "full",
        className:
          "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100",
      },
      {
        type: "info",
        colorScheme: "full",
        className:
          "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100",
      },
      {
        type: "loading",
        colorScheme: "full",
        className:
          "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100",
      },
      {
        type: "default",
        colorScheme: "full",
        className:
          "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100",
      },
    ],
    defaultVariants: {
      type: "default",
      size: "md",
      colorScheme: "full",
    },
  }
);

// CVA variants for the icon container
const iconContainerVariants = cva("relative flex items-start justify-center", {
  variants: {
    type: {
      default: "bg-gray-100 dark:bg-gray-800",
      warning: "bg-yellow-100 dark:bg-yellow-900/20",
      error: "bg-red-100 dark:bg-red-900/20",
      success: "bg-green-100 dark:bg-green-900/20",
      info: "bg-blue-100 dark:bg-blue-900/20",
      loading: "bg-gray-100 dark:bg-gray-800",
    },
    size: {
      xs: "rounded-lg p-2",
      sm: "rounded-xl p-2",
      md: "rounded-2xl p-3",
      lg: "rounded-2xl p-4",
      xl: "rounded-3xl p-5",
      "2xl": "rounded-3xl p-6",
    },
  },
  defaultVariants: {
    type: "default",
    size: "md",
  },
});

// CVA variants for icons
const iconVariants = cva("icon", {
  variants: {
    type: {
      default: "text-gray-500",
      warning: "text-yellow-500",
      error: "text-red-500",
      success: "text-green-500",
      info: "text-blue-500",
      loading: "text-gray-500",
    },
    size: {
      xs: "w-3 h-3",
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
      xl: "w-7 h-7",
      "2xl": "w-8 h-8",
    },
  },
  defaultVariants: {
    type: "default",
    size: "md",
  },
});

// CVA variants for title
const titleVariants = cva("font-medium", {
  variants: {
    size: {
      xs: "text-sm",
      sm: "text-base",
      md: "text-lg font-semibold max-md:text-base",
      lg: "text-xl font-semibold",
      xl: "text-2xl font-semibold",
      "2xl": "text-3xl font-bold",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// CVA variants for description
const descriptionVariants = cva("opacity-80", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base max-md:text-sm",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// CVA variants for actions container
const actionsVariants = cva("flex flex-wrap", {
  variants: {
    size: {
      xs: "mt-1 gap-1",
      sm: "mt-1.5 gap-1.5",
      md: "mt-2 gap-2",
      lg: "mt-3 gap-2.5",
      xl: "mt-4 gap-3",
      "2xl": "mt-5 gap-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

// CVA variants for close button
const closeButtonVariants = cva("absolute", {
  variants: {
    size: {
      xs: "right-1 top-1",
      sm: "right-2 top-2",
      md: "right-3 top-3",
      lg: "right-4 top-4",
      xl: "right-5 top-5",
      "2xl": "right-6 top-6",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface InfoBoxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title">,
    VariantProps<typeof infoBoxVariants> {
  loading?: boolean;
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  actions?: Array<ActionObject | ReactNode>;
  children?: ReactNode;
  onClose?: () => void;
}

// Safe type guard function
const isActionObject = (action: unknown): action is ActionObject => {
  return (
    typeof action === "object" &&
    action !== null &&
    !React.isValidElement(action) &&
    "name" in (action as never)
  );
};

const InfoBox: FC<InfoBoxProps> = ({
  loading,
  icon,
  title,
  description,
  actions,
  children,
  type = "default",
  size = "md",
  colorScheme = "default",
  className,
  onClose,
  ...props
}) => {
  // Map type to appropriate icon
  const getIconByType = () => {
    const iconProps = {
      className: iconVariants({ type, size }),
      color: "currentColor" as const,
      variant: "Bulk" as const,
    };

    if (loading) {
      return <Loader loading className={iconVariants({ size })} />;
    }

    switch (type) {
      case "warning":
        return <Warning2 {...iconProps} />;
      case "error":
        return <Danger {...iconProps} />;
      case "success":
        return <TickCircle {...iconProps} />;
      case "info":
        return <InfoCircle {...iconProps} />;
      case "loading":
        return <Loader loading={true} className={iconVariants({ size })} />;
      default:
        return <Information {...iconProps} />;
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

  const getActionSize = () => {
    switch (size) {
      case "xs":
      case "sm":
        return "sm";
      case "lg":
      case "xl":
      case "2xl":
        return "lg";
      default:
        return "md";
    }
  };

  const renderAction = (action: ActionObject, index: number) => {
    const variant = getActionVariant(action.type || "default");
    const buttonSize = getActionSize();

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
      return (
        <Button key={index} asChild variant={variant} size={buttonSize}>
          <Link href={action.path}>{content}</Link>
        </Button>
      );
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
    } else {
      return <React.Fragment key={index}>{action}</React.Fragment>;
    }
  };

  const displayIcon = icon || getIconByType();

  return (
    <div
      className={cn(infoBoxVariants({ type, size, colorScheme }), className)}
      {...props}
    >
      {displayIcon && (
        <div className={iconContainerVariants({ type, size })}>
          {displayIcon}
        </div>
      )}

      <div className="flex-1">
        {title && <h3 className={titleVariants({ size })}>{title}</h3>}
        {description && (
          <div className={descriptionVariants({ size })}>{description}</div>
        )}

        {actions && actions.length > 0 && (
          <div className={actionsVariants({ size })}>
            {actions.map((action, index) => renderActionItem(action, index))}
          </div>
        )}

        {children}
      </div>

      {onClose && (
        <Button
          onClick={onClose}
          variant="ghost"
          size={getActionSize()}
          className={closeButtonVariants({ size })}
          aria-label="Close"
        >
          <CloseCircle className="icon" color="currentColor" variant="Bulk" />
        </Button>
      )}
    </div>
  );
};

export { InfoBox, infoBoxVariants };
export type { InfoBoxProps };
