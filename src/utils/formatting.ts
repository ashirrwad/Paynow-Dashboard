/**
 * Common formatting utilities for the Agent Decision Viewer application
 */

/**
 * Formats a number as a currency string using USD format
 * @param amount - The amount to format
 * @param locale - Optional locale to use, defaults to navigator.language
 * @returns Formatted currency string
 */
export const formatAmount = (amount: number, locale?: string): string => {
  return new Intl.NumberFormat(locale || navigator.language, {
    style: "currency",
    currency: "USD",
  }).format(amount);
};

/**
 * Formats a timestamp as a localized date and time string
 * @param timestamp - Unix timestamp in milliseconds
 * @param locale - Optional locale to use, defaults to navigator.language
 * @param options - Optional Intl.DateTimeFormatOptions
 * @returns Formatted date and time string
 */
export const formatTimestamp = (
  timestamp: number,
  locale?: string,
  options?: Intl.DateTimeFormatOptions
): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  };

  return new Intl.DateTimeFormat(
    locale || navigator.language,
    options || defaultOptions
  ).format(new Date(timestamp));
};

/**
 * Formats a timestamp as a simple time string (for compact display)
 * @param timestamp - Unix timestamp in milliseconds
 * @param locale - Optional locale to use, defaults to navigator.language
 * @returns Formatted time string
 */
export const formatTimeOnly = (timestamp: number, locale?: string): string => {
  return new Date(timestamp).toLocaleTimeString(locale || navigator.language);
};

/**
 * Masks a customer ID for privacy by showing only a prefix and suffix
 * @param customerId - The customer ID to mask
 * @returns Masked customer ID string
 */
export const maskCustomerId = (customerId: string): string => {
  if (customerId.length <= 6) {
    return `c_***${customerId}`;
  }
  const lastThree = customerId.slice(-3);
  return `c_***${lastThree}`;
};
