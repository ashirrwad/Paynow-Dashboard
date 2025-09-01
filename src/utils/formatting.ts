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
 * Configuration for customer ID masking
 */
export interface CustomerIdMaskConfig {
  /** Prefix to show before the mask */
  prefix?: string;
  /** Mask character to use */
  maskChar?: string;
  /** Number of characters to show at the end */
  suffixLength?: number;
  /** Number of mask characters to show */
  maskLength?: number;
}

/**
 * Default configuration for customer ID masking
 */
const DEFAULT_MASK_CONFIG: Required<CustomerIdMaskConfig> = {
  prefix: 'c_',
  maskChar: '*',
  suffixLength: 3,
  maskLength: 3,
};

/**
 * Masks a customer ID for privacy by showing only a prefix and suffix
 * @param customerId - The customer ID to mask
 * @param config - Optional configuration for masking behavior
 * @returns Masked customer ID string
 * 
 * @example
 * maskCustomerId("customer123456") // Returns "c_***456"
 * maskCustomerId("cust123", { suffixLength: 2 }) // Returns "c_***23"
 * maskCustomerId("customer123456", { prefix: "cust_", maskChar: "X", maskLength: 4 }) // Returns "cust_XXXX456"
 */
export const maskCustomerId = (
  customerId: string, 
  config: CustomerIdMaskConfig = {}
): string => {
  const finalConfig = { ...DEFAULT_MASK_CONFIG, ...config };
  
  // For very short customer IDs, show the whole ID with prefix and mask
  if (customerId.length <= finalConfig.suffixLength) {
    return `${finalConfig.prefix}${finalConfig.maskChar.repeat(finalConfig.maskLength)}${customerId}`;
  }
  
  const suffix = customerId.slice(-finalConfig.suffixLength);
  const mask = finalConfig.maskChar.repeat(finalConfig.maskLength);
  return `${finalConfig.prefix}${mask}${suffix}`;
};

/**
 * Type for objects that contain customer ID data
 */
export interface WithCustomerId {
  customerId: string;
}

/**
 * Type for objects with masked customer ID
 */
export interface WithMaskedCustomerId {
  customerId: string;
  originalCustomerId?: string; // Keep original for internal use if needed
}

/**
 * Transforms decision data by masking customer IDs
 * This ensures consistent masking across all components
 * @param data - Data object containing customer ID
 * @param config - Optional masking configuration
 * @returns Data with masked customer ID
 */
export const maskCustomerIdInData = <T extends WithCustomerId>(
  data: T,
  config: CustomerIdMaskConfig = {}
): T & WithMaskedCustomerId => {
  return {
    ...data,
    originalCustomerId: data.customerId, // Preserve original for API calls
    customerId: maskCustomerId(data.customerId, config),
  };
};

/**
 * Transforms an array of decision data by masking all customer IDs
 * @param dataArray - Array of data objects containing customer IDs
 * @param config - Optional masking configuration
 * @returns Array with masked customer IDs
 */
export const maskCustomerIdsInArray = <T extends WithCustomerId>(
  dataArray: T[],
  config: CustomerIdMaskConfig = {}
): (T & WithMaskedCustomerId)[] => {
  return dataArray.map(item => maskCustomerIdInData(item, config));
};
