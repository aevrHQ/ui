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
import { cn } from "@/lib/utils";
import { Button } from "./button";
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

interface InfoBoxProps {
  loading?: boolean;
  icon?: ReactNode;
  title?: string | ReactNode;
  description?: string | ReactNode;
  actions?: Array<ActionObject | ReactNode>;
  children?: ReactNode;
  type?: InfoBoxType;
  size?: InfoBoxSize;
  colorScheme?: "default" | "full";
  className?: string;
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
  colorScheme = "full",
  className,
  onClose,
}) => {
  // Get size-specific classes
  const getSizeClasses = () => {
    switch (size) {
      case "xs":
        return {
          container: "gap-2 rounded-xl border p-2",
          iconContainer: "rounded-lg p-2",
          icon: "w-3 h-3",
          title: "text-sm font-medium",
          description: "text-xs",
          actions: "mt-1 gap-1",
          closeButton: "right-1 top-1",
        };
      case "sm":
        return {
          container: "gap-3 rounded-2xl border p-3",
          iconContainer: "rounded-xl p-2",
          icon: "w-4 h-4",
          title: "text-base font-medium",
          description: "text-sm",
          actions: "mt-1.5 gap-1.5",
          closeButton: "right-2 top-2",
        };
      case "md":
        return {
          container:
            "gap-4 rounded-3xl border p-5 max-md:flex-col max-md:gap-2 max-md:p-3",
          iconContainer: "rounded-2xl p-3",
          icon: "w-5 h-5",
          title: "text-lg font-semibold max-md:text-base",
          description: "text-base max-md:text-sm",
          actions: "mt-2 gap-2",
          closeButton: "right-3 top-3",
        };
      case "lg":
        return {
          container: "gap-5 rounded-3xl border p-6",
          iconContainer: "rounded-2xl p-4",
          icon: "w-6 h-6",
          title: "text-xl font-semibold",
          description: "text-lg",
          actions: "mt-3 gap-2.5",
          closeButton: "right-4 top-4",
        };
      case "xl":
        return {
          container: "gap-6 rounded-3xl border p-8",
          iconContainer: "rounded-3xl p-5",
          icon: "w-7 h-7",
          title: "text-2xl font-semibold",
          description: "text-xl",
          actions: "mt-4 gap-3",
          closeButton: "right-5 top-5",
        };
      case "2xl":
        return {
          container: "gap-8 rounded-3xl border p-10",
          iconContainer: "rounded-3xl p-6",
          icon: "w-8 h-8",
          title: "text-3xl font-bold",
          description: "text-2xl",
          actions: "mt-5 gap-4",
          closeButton: "right-6 top-6",
        };
      default:
        return {
          container:
            "gap-4 rounded-3xl border p-5 max-md:flex-col max-md:gap-2 max-md:p-3",
          iconContainer: "rounded-2xl p-3",
          icon: "w-5 h-5",
          title: "text-lg font-semibold max-md:text-base",
          description: "text-base max-md:text-sm",
          actions: "mt-2 gap-2",
          closeButton: "right-3 top-3",
        };
    }
  };

  const sizeClasses = getSizeClasses();

  // Map type to appropriate icon and styles
  const getIconByType = () => {
    const iconProps = {
      className: cn("icon", sizeClasses.icon),
      color: "currentColor" as const,
      variant: "Bulk" as const,
    };

    if (loading) {
      return <Loader loading className={cn("icon", sizeClasses.icon)} />;
    }

    switch (type) {
      case "warning":
        return (
          <Warning2
            {...iconProps}
            className={cn(iconProps.className, "text-yellow-500")}
          />
        );
      case "error":
        return (
          <Danger
            {...iconProps}
            className={cn(iconProps.className, "text-red-500")}
          />
        );
      case "success":
        return (
          <TickCircle
            {...iconProps}
            className={cn(iconProps.className, "text-green-500")}
          />
        );
      case "info":
        return (
          <InfoCircle
            {...iconProps}
            className={cn(iconProps.className, "text-blue-500")}
          />
        );
      case "loading":
        return (
          <Loader loading={true} className={cn("icon", sizeClasses.icon)} />
        );
      default:
        return <Information {...iconProps} />;
    }
  };

  const getIconContainerClasses = () => {
    const baseClasses = cn(
      "relative flex items-start justify-center",
      sizeClasses.iconContainer
    );

    switch (type) {
      case "warning":
        return cn(baseClasses, "bg-yellow-100 dark:bg-yellow-900/20");
      case "error":
        return cn(baseClasses, "bg-red-100 dark:bg-red-900/20");
      case "success":
        return cn(baseClasses, "bg-green-100 dark:bg-green-900/20");
      case "info":
        return cn(baseClasses, "bg-blue-100 dark:bg-blue-900/20");
      default:
        return cn(baseClasses, "bg-gray-100 dark:bg-gray-800");
    }
  };

  const getColorSchemeClasses = () => {
    if (colorScheme === "default") {
      return "border-gray-200 bg-gray-50 text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100";
    }

    switch (type) {
      case "warning":
        return "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100";
      case "error":
        return "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100";
      case "success":
        return "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-900 dark:text-green-100";
      case "info":
        return "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100";
      default:
        return "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100";
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
      className={cn(
        "relative flex grow flex-wrap items-start",
        sizeClasses.container,
        getColorSchemeClasses(),
        className
      )}
    >
      {displayIcon && (
        <div className={getIconContainerClasses()}>{displayIcon}</div>
      )}

      <div className="flex-1">
        {title && <h3 className={sizeClasses.title}>{title}</h3>}
        {description && (
          <div className={cn("opacity-80", sizeClasses.description)}>
            {description}
          </div>
        )}

        {actions && actions.length > 0 && (
          <div className={cn("flex flex-wrap", sizeClasses.actions)}>
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
          className={cn("absolute", sizeClasses.closeButton)}
          aria-label="Close"
        >
          <CloseCircle className="icon" color="currentColor" variant="Bulk" />
        </Button>
      )}
    </div>
  );
};

export { InfoBox };
