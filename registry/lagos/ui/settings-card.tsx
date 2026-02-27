import * as React from "react";

import { cn } from "@/lib/utils";

const SettingsCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-card-foreground border-border/60 overflow-hidden rounded-3xl border bg-transparent",
      className,
    )}
    {...props}
  />
));
SettingsCard.displayName = "SettingsCard";

const SettingsCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
SettingsCardHeader.displayName = "SettingsCardHeader";

const SettingsCardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("leading-none font-semibold tracking-tight", className)}
    {...props}
  />
));
SettingsCardTitle.displayName = "SettingsCardTitle";

const SettingsCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
SettingsCardDescription.displayName = "SettingsCardDescription";

const SettingsCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
SettingsCardContent.displayName = "SettingsCardContent";

const SettingsRow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "hover:bg-muted/50 flex items-center justify-between gap-4 border-b p-4 transition-colors last:border-0 sm:px-6",
      className,
    )}
    {...props}
  />
));
SettingsRow.displayName = "SettingsRow";

const SettingsRowContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex min-w-0 flex-1 items-center gap-4", className)}
    {...props}
  />
));
SettingsRowContent.displayName = "SettingsRowContent";

const SettingsRowLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm leading-none font-medium", className)}
    {...props}
  />
));
SettingsRowLabel.displayName = "SettingsRowLabel";

const SettingsRowValue = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
SettingsRowValue.displayName = "SettingsRowValue";

const SettingsRowAction = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex shrink-0 items-center gap-2", className)}
    {...props}
  />
));
SettingsRowAction.displayName = "SettingsRowAction";

export {
  SettingsCard,
  SettingsCardHeader,
  SettingsCardTitle,
  SettingsCardDescription,
  SettingsCardContent,
  SettingsRow,
  SettingsRowContent,
  SettingsRowLabel,
  SettingsRowValue,
  SettingsRowAction,
};
