// ./registry/lagos/hooks/use-share.ts

import { useState } from "react";
import { logger } from "@untools/logger";
import { toast } from "sonner";

type CopyOptions = {
  successMessage?: string;
  errorMessage?: string;
  clearAfterMs?: number;
};

type ShareContentOptions = {
  title: string;
  description: string;
  fallbackCopy?: boolean;
  successMessage?: string;
  errorMessage?: string;
};

type ShareFileOptions = {
  files: File[];
  title?: string;
  text?: string;
  fallbackMessage?: string;
  successMessage?: string;
  errorMessage?: string;
};

const useShare = () => {
  const [isCopying, setIsCopying] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const copy = async (
    text: string,
    options?: CopyOptions
  ): Promise<boolean> => {
    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(text);
      toast.success(options?.successMessage || `Copied to clipboard`);
      logger.log("Copied to clipboard:", text);

      if (options?.clearAfterMs) {
        setTimeout(() => {
          navigator.clipboard.writeText("");
          logger.log("Clipboard cleared after delay");
        }, options.clearAfterMs);
      }

      return true;
    } catch (error) {
      logger.error("Clipboard error:", error);
      toast.error(options?.errorMessage || "Failed to copy to clipboard");
      return false;
    } finally {
      setIsCopying(false);
    }
  };

  const shareContent = async (
    url: string,
    options: ShareContentOptions
  ): Promise<boolean> => {
    setIsSharing(true);

    if (navigator.share) {
      try {
        await navigator.share({
          title: options.title,
          text: options.description,
          url,
        });
        toast.success(options.successMessage || "Shared successfully");
        logger.log("Successfully shared content:", { url, ...options });
        return true;
      } catch (error) {
        logger.error("Sharing error:", error);
        toast.error(options.errorMessage || "Failed to share content");
        if (options.fallbackCopy) {
          return copy(url, { successMessage: "Copied link instead" });
        }
        return false;
      } finally {
        setIsSharing(false);
      }
    } else {
      toast.error("Sharing not supported on this browser");
      logger.warn("Web Share API not supported for content");
      if (options.fallbackCopy) {
        return copy(url, { successMessage: "Copied link instead" });
      }
      setIsSharing(false);
      return false;
    }
  };

  const shareFiles = async (options: ShareFileOptions): Promise<boolean> => {
    setIsSharing(true);

    const {
      files,
      title,
      text,
      fallbackMessage,
      successMessage,
      errorMessage,
    } = options;

    if (!navigator.canShare || !navigator.canShare({ files })) {
      toast.error("File sharing not supported");
      logger.warn("File sharing not supported by browser or file type");
      if (fallbackMessage) {
        toast(fallbackMessage);
      }
      setIsSharing(false);
      return false;
    }

    try {
      await navigator.share({
        title,
        text,
        files,
      });
      toast.success(successMessage || "Files shared successfully");
      logger.log("Files shared successfully:", files);
      return true;
    } catch (error) {
      logger.error("File sharing error:", error);
      toast.error(errorMessage || "Failed to share files");
      return false;
    } finally {
      setIsSharing(false);
    }
  };

  return {
    copy,
    shareContent,
    shareFiles,
    isCopying,
    isSharing,
  };
};

export default useShare;
