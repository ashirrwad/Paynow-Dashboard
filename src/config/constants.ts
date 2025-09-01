// Application-wide configuration constants

export const APP_CONFIG = {
  // Form settings
  FORM_DEBOUNCE_MS: 300,
  
  // Pagination settings
  DEFAULT_PAGE_SIZE: 10,
  
  // API settings
  REQUEST_TIMEOUT_MS: 30000,
  
  // Storage keys
  STORAGE_KEYS: {
    USER: "user",
    TOKEN: "authToken",
  },
  
  // Validation limits
  VALIDATION: {
    AMOUNT: {
      MIN: 0.01,
      MAX: 1000000,
    },
    PAYEE: {
      MIN_LENGTH: 2,
      MAX_LENGTH: 100,
    },
    CUSTOMER_ID: {
      MIN_LENGTH: 3,
      MAX_LENGTH: 50,
    },
  },
  
  // Display settings
  DECISIONS_STORE_LIMIT: 20,
  
  // Animation durations
  ANIMATION: {
    DRAWER_OPEN_MS: 300,
    DRAWER_CLOSE_MS: 200,
    TOAST_DURATION_MS: 5000,
  },
} as const;