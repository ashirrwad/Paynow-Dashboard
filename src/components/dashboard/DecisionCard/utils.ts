import type { FormData, FormErrors } from './types';

export const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.amount.trim()) {
    errors.amount = 'Amount is required';
  } else {
    const amount = parseFloat(data.amount);
    if (isNaN(amount) || amount <= 0) {
      errors.amount = 'Amount must be a positive number';
    }
  }
  
  if (!data.payee.trim()) {
    errors.payee = 'Payee is required';
  } else if (data.payee.trim().length < 2) {
    errors.payee = 'Payee must be at least 2 characters';
  }
  
  if (!data.customerId.trim()) {
    errors.customerId = 'Customer ID is required';
  } else if (data.customerId.trim().length < 3) {
    errors.customerId = 'Customer ID must be at least 3 characters';
  }
  
  return errors;
};