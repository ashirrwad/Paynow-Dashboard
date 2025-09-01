import {
  validateAmount,
  validatePayee,
  validateCustomerId,
  validateDecisionForm
} from '@/utils/validation';
import { mockFormData } from '../fixtures/basic';

describe('Validation Utils', () => {
  describe('validateAmount', () => {
    it('accepts valid amounts', () => {
      expect(validateAmount(mockFormData.amount)).toBeUndefined();
      expect(validateAmount('100')).toBeUndefined();
      expect(validateAmount('0.01')).toBeUndefined();
    });

    it('rejects invalid amounts', () => {
      expect(validateAmount('')).toBeTruthy();
      expect(validateAmount('-50')).toBeTruthy();
      expect(validateAmount('0')).toBeTruthy();
      expect(validateAmount('abc')).toBeTruthy();
    });
  });

  describe('validatePayee', () => {
    it('accepts valid payee names', () => {
      expect(validatePayee(mockFormData.payee)).toBeUndefined();
      expect(validatePayee("O'Connor")).toBeUndefined();
      expect(validatePayee('Mary-Jane')).toBeUndefined();
    });

    it('rejects invalid payee names', () => {
      expect(validatePayee('')).toBeTruthy();
      expect(validatePayee('A')).toBeTruthy();
      expect(validatePayee('User123')).toBeTruthy();
    });
  });

  describe('validateCustomerId', () => {
    it('accepts valid customer IDs', () => {
      expect(validateCustomerId(mockFormData.customerId)).toBeUndefined();
      expect(validateCustomerId('user456')).toBeUndefined();
    });

    it('rejects invalid customer IDs', () => {
      expect(validateCustomerId('')).toBeTruthy();
      expect(validateCustomerId('ab')).toBeTruthy();
    });
  });

  describe('validateDecisionForm', () => {
    it('validates complete form', () => {
      const errors = validateDecisionForm(mockFormData);
      expect(Object.keys(errors)).toHaveLength(0);
    });

    it('returns errors for invalid form', () => {
      const invalidData = {
        amount: '',
        payee: '',
        customerId: ''
      };
      
      const errors = validateDecisionForm(invalidData);
      expect(errors.amount).toBeTruthy();
      expect(errors.payee).toBeTruthy();
      expect(errors.customerId).toBeTruthy();
    });
  });
});