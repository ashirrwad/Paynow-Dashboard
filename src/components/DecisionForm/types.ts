/**
 * DecisionForm component type definitions
 */

export interface FormData {
  amount: string;
  payee: string;
  customerId: string;
}

export interface FormErrors {
  amount?: string;
  payee?: string;
  customerId?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}