import {
  formatAmount,
  maskCustomerId
} from '@/utils/formatting';
import { mockDecision } from '../fixtures/basic';

describe('Formatting Utils', () => {
  describe('formatAmount', () => {
    it('formats amounts as currency', () => {
      const result = formatAmount(mockDecision.amount);
      expect(result).toMatch(/\$100\.50/);
    });

    it('formats large amounts with commas', () => {
      const result = formatAmount(15000);
      expect(result).toMatch(/\$15,000\.00/);
    });

    it('handles zero amount', () => {
      const result = formatAmount(0);
      expect(result).toMatch(/\$0\.00/);
    });
  });

  describe('maskCustomerId', () => {
    it('masks standard customer IDs', () => {
      expect(maskCustomerId(mockDecision.customerId)).toBe('c_***56');
      expect(maskCustomerId('user789012')).toBe('c_***12');
    });

    it('handles short customer IDs', () => {
      expect(maskCustomerId('abc')).toBe('c_***bc');
      expect(maskCustomerId('12')).toBe('c_***12');
    });

    it('masks long customer IDs', () => {
      expect(maskCustomerId('very-long-customer-id-123456')).toBe('c_***56');
    });
  });
});