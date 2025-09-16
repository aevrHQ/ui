// ./utils/dateFormatter.ts

import { logger } from "@untools/logger";
import {
  format,
  parseISO,
  isValid,
  fromUnixTime,
  formatDistanceToNow,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import * as locales from "date-fns/locale";

type DateInput = string | number | Date;

interface FormatDateOptions {
  formatStyle?: "absolute" | "relative";
  formatString?: string; // for absolute
  locale?: keyof typeof locales;
  timeZone?: string; // e.g., "America/New_York"
}

/**
 * Formats a date with options for relative time, timezones, and localization.
 */
export function formatDate(
  input: DateInput | null | undefined,
  {
    formatStyle = "relative",
    formatString = "PPP",
    locale = "enUS",
    timeZone,
  }: FormatDateOptions = {}
): string {
  logger.debug({
    input,
    formatStyle,
    formatString,
    locale,
    timeZone,
    type: typeof input,
  });

  if (!input) {
    logger.warn({ message: "No date input provided", input });
    return "N/A";
  }

  let date: Date;

  // Handle different input types
  if (typeof input === "string") {
    // Check if the string is a numeric timestamp
    if (/^\d+$/.test(input)) {
      // Convert string timestamp to number and create Date
      const timestamp = parseInt(input, 10);

      // Check if it's seconds or milliseconds
      // Most Unix timestamps are in seconds (10 digits for recent dates)
      // While JavaScript uses milliseconds (13 digits for recent dates)
      if (input.length <= 10) {
        // Assuming seconds, convert to milliseconds
        date = fromUnixTime(timestamp);
      } else {
        // Assuming milliseconds
        date = new Date(timestamp);
      }
    } else {
      // Try to parse as ISO date string
      date = parseISO(input);
    }
  } else if (typeof input === "number") {
    // For number inputs, check if seconds or milliseconds
    if (input < 10000000000) {
      // Rough threshold for seconds vs milliseconds
      date = fromUnixTime(input);
    } else {
      date = new Date(input);
    }
  } else {
    // Already a Date object
    date = input;
  }

  // Check if the date is valid
  if (!isValid(date)) {
    logger.warn({ message: "Invalid date encountered", input });
    return "Invalid date";
  }

  const localeObj = locales[locale] || locales.enUS;

  if (formatStyle === "relative") {
    return formatDistanceToNow(date, { addSuffix: true, locale: localeObj });
  }

  if (timeZone) {
    return formatInTimeZone(date, timeZone, formatString, {
      locale: localeObj,
    });
  }

  return format(date, formatString, { locale: localeObj });
}

/**
 * Common date-time format presets
 */
export enum DateTimePreset {
  SHORT = "short",
  MEDIUM = "medium",
  LONG = "long",
  FULL = "full",
  ISO = "iso",
  SIMPLE = "simple",
  TIME_ONLY = "timeOnly",
  DATE_ONLY = "dateOnly",
  CUSTOM = "custom",
}

/**
 * Enhanced datetime formatter with preset formats and better options
 */
export function formatDateTime(
  input: DateInput,
  options: {
    preset?: DateTimePreset;
    formatString?: string;
    locale?: keyof typeof locales;
    timeZone?: string;
    includeSeconds?: boolean;
    use24HourFormat?: boolean;
  } = {}
): string {
  const {
    preset = DateTimePreset.MEDIUM,
    formatString,
    locale = "enUS",
    timeZone,
    includeSeconds = false,
    use24HourFormat = false,
  } = options;

  // If custom format is provided, use it directly
  if (formatString) {
    return formatDate(input, {
      formatStyle: "absolute",
      formatString,
      locale,
      timeZone,
    });
  }

  // Define format patterns based on presets
  const formatPatterns: Record<DateTimePreset, string> = {
    [DateTimePreset.SHORT]: use24HourFormat
      ? `dd/MM/yyyy ${includeSeconds ? "HH:mm:ss" : "HH:mm"}`
      : `MM/dd/yyyy ${includeSeconds ? "h:mm:ss a" : "h:mm a"}`,
    [DateTimePreset.MEDIUM]: use24HourFormat
      ? `d MMM yyyy ${includeSeconds ? "HH:mm:ss" : "HH:mm"}`
      : `MMM d, yyyy ${includeSeconds ? "h:mm:ss a" : "h:mm a"}`,
    [DateTimePreset.LONG]: use24HourFormat
      ? `d MMMM yyyy ${includeSeconds ? "HH:mm:ss" : "HH:mm"}`
      : `MMMM d, yyyy ${includeSeconds ? "h:mm:ss a" : "h:mm a"}`,
    [DateTimePreset.FULL]: use24HourFormat
      ? `EEEE, d MMMM yyyy ${includeSeconds ? "HH:mm:ss" : "HH:mm"}`
      : `EEEE, MMMM d, yyyy ${includeSeconds ? "h:mm:ss a" : "h:mm a"}`,
    [DateTimePreset.ISO]: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
    [DateTimePreset.SIMPLE]: "yyyy-MM-dd HH:mm:ss",
    [DateTimePreset.TIME_ONLY]: use24HourFormat
      ? includeSeconds
        ? "HH:mm:ss"
        : "HH:mm"
      : includeSeconds
      ? "h:mm:ss a"
      : "h:mm a",
    [DateTimePreset.DATE_ONLY]: "yyyy-MM-dd",
    [DateTimePreset.CUSTOM]: formatString || "yyyy-MM-dd HH:mm:ss", // Fallback
  };

  return formatDate(input, {
    formatStyle: "absolute",
    formatString: formatPatterns[preset],
    locale,
    timeZone,
  });
}

/**
 * Formats a date as a relative time (e.g., "2 hours ago", "in 3 days")
 */
export function formatRelativeTime(
  input: DateInput,
  options: {
    locale?: keyof typeof locales;
  } = {}
): string {
  return formatDate(input, {
    formatStyle: "relative",
    locale: options.locale,
  });
}

/**
 * Returns a user-friendly date and time representation with smart formatting
 * If the date is today, it returns only the time
 * If the date is this year, it omits the year
 * Otherwise returns the full date and time
 */
export function formatSmartDateTime(
  input: DateInput,
  options: {
    locale?: keyof typeof locales;
    timeZone?: string;
    use24HourFormat?: boolean;
    includeSeconds?: boolean;
  } = {}
): string {
  const {
    locale = "enUS",
    timeZone,
    use24HourFormat = false,
    includeSeconds = false,
  } = options;

  const date = ensureDate(input);
  if (!isValid(date)) return "Invalid date";

  const now = new Date();
  const isToday =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  const isThisYear = date.getFullYear() === now.getFullYear();

  const timeFormat = use24HourFormat
    ? includeSeconds
      ? "HH:mm:ss"
      : "HH:mm"
    : includeSeconds
    ? "h:mm:ss a"
    : "h:mm a";

  let formatString;
  if (isToday) {
    formatString = timeFormat;
  } else if (isThisYear) {
    formatString = `MMM d, ${timeFormat}`;
  } else {
    formatString = `MMM d, yyyy, ${timeFormat}`;
  }

  return formatDate(date, {
    formatStyle: "absolute",
    formatString,
    locale,
    timeZone,
  });
}

/**
 * Helper function to ensure we have a valid Date object
 */
function ensureDate(input: DateInput): Date {
  if (typeof input === "string") {
    if (/^\d+$/.test(input)) {
      const timestamp = parseInt(input, 10);
      return input.length <= 10 ? fromUnixTime(timestamp) : new Date(timestamp);
    }
    return parseISO(input);
  } else if (typeof input === "number") {
    return input < 10000000000 ? fromUnixTime(input) : new Date(input);
  }
  return input;
}
