// Shared form validation utilities

export interface DecisionFormData {
  amount: string;
  payee: string;
  customerId: string;
}

export interface FormErrors {
  amount?: string;
  payee?: string;
  customerId?: string;
}

// Validation configuration
export const VALIDATION_RULES = {
  amount: {
    required: true,
    min: 0.01,
    errorMessages: {
      required: "Amount is required",
      invalid: "Amount must be a positive number",
      min: "Amount must be greater than 0",
    },
  },
  payee: {
    required: true,
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    errorMessages: {
      required: "Payee is required",
      minLength: "Payee must be at least 2 characters",
      maxLength: "Payee cannot exceed 100 characters",
      pattern: "Payee name can only contain letters, spaces, apostrophes, and hyphens",
    },
  },
  customerId: {
    required: true,
    minLength: 3,
    maxLength: 50,
    errorMessages: {
      required: "Customer ID is required",
      minLength: "Customer ID must be at least 3 characters",
      maxLength: "Customer ID cannot exceed 50 characters",
    },
  },
} as const;

// Individual field validators
export const validateAmount = (amount: string): string | undefined => {
  if (!amount.trim()) {
    return VALIDATION_RULES.amount.errorMessages.required;
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return VALIDATION_RULES.amount.errorMessages.invalid;
  }

  if (numericAmount < VALIDATION_RULES.amount.min) {
    return VALIDATION_RULES.amount.errorMessages.min;
  }

  return undefined;
};

export const validatePayee = (payee: string): string | undefined => {
  if (!payee.trim()) {
    return VALIDATION_RULES.payee.errorMessages.required;
  }

  const trimmedPayee = payee.trim();
  if (trimmedPayee.length < VALIDATION_RULES.payee.minLength) {
    return VALIDATION_RULES.payee.errorMessages.minLength;
  }

  if (trimmedPayee.length > VALIDATION_RULES.payee.maxLength) {
    return VALIDATION_RULES.payee.errorMessages.maxLength;
  }

  if (!VALIDATION_RULES.payee.pattern.test(trimmedPayee)) {
    return VALIDATION_RULES.payee.errorMessages.pattern;
  }

  return undefined;
};

export const validateCustomerId = (customerId: string): string | undefined => {
  if (!customerId.trim()) {
    return VALIDATION_RULES.customerId.errorMessages.required;
  }

  const trimmedCustomerId = customerId.trim();
  if (trimmedCustomerId.length < VALIDATION_RULES.customerId.minLength) {
    return VALIDATION_RULES.customerId.errorMessages.minLength;
  }

  if (trimmedCustomerId.length > VALIDATION_RULES.customerId.maxLength) {
    return VALIDATION_RULES.customerId.errorMessages.maxLength;
  }

  return undefined;
};

// Complete form validation
export const validateDecisionForm = (data: DecisionFormData): FormErrors => {
  const errors: FormErrors = {};

  const amountError = validateAmount(data.amount);
  if (amountError) errors.amount = amountError;

  const payeeError = validatePayee(data.payee);
  if (payeeError) errors.payee = payeeError;

  const customerIdError = validateCustomerId(data.customerId);
  if (customerIdError) errors.customerId = customerIdError;

  return errors;
};

// Helper function to check if form has any errors
export const hasValidationErrors = (errors: FormErrors): boolean => {
  return Object.values(errors).some(error => error !== undefined);
};

// Transform form data to API request format
export const transformToDecisionRequest = (data: DecisionFormData) => {
  return {
    amount: parseFloat(data.amount),
    payee: data.payee.trim(),
    customerId: data.customerId.trim(),
  };
};