// ./registry/lagos/ui/responsive-dialog.tsx

"use client";

import React, { ReactNode, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/registry/lagos/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/lagos/ui/drawer";
import { useMediaQuery } from "@/registry/lagos/hooks/use-media-query";
import { ScrollArea } from "@/registry/lagos/ui/scroll-area";

export interface ResponsiveDialogProps {
  title?: string | null;
  description?: string | null;
  drawerClose?: ReactNode;
  trigger?: ReactNode;
  children?: ReactNode;
  openPrompt?: boolean;
  onOpenPromptChange?: (open?: boolean) => void;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  children,
  trigger,
  openPrompt,
  title,
  description,
  drawerClose,
  onOpenPromptChange,
}) => {
  const [open, setOpen] = useState(openPrompt);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    setOpen(openPrompt);
  }, [openPrompt]);

  useEffect(() => {
    if (onOpenPromptChange) {
      onOpenPromptChange(open);
    }
  }, [open]);

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent
          className={`max-h-[90vh] max-w-4xl ${
            title != null || description != null ? "" : "gap-0"
          }`}
        >
          <DialogHeader className="px-2">
            {title != null && <DialogTitle>{title || "Heads Up!"}</DialogTitle>}
            {description != null && (
              <DialogDescription>
                {description ||
                  "Here's some important information or action you need to review and take"}
              </DialogDescription>
            )}
          </DialogHeader>
          <ScrollArea className="max-h-[calc(90vh-5.35rem)]">
            {children}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer shouldScaleBackground open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="max-h-[95%]">
        <div className="wrapper overflow-y-auto">
          <DrawerHeader
            className={`text-left ${
              title != null || description != null ? "p-6" : "p-0"
            }`}
          >
            {title != null && <DrawerTitle>{title || "Heads Up!"}</DrawerTitle>}
            {description != null && (
              <DrawerDescription>
                {description ||
                  "Here's some important information or action you need to review and take"}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <div className="px-4">{children}</div>
          <DrawerFooter className="flex flex-row gap-4">
            <DrawerClose asChild>{drawerClose}</DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialog;
