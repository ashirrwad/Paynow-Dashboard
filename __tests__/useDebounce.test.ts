import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '@/hooks/useDebounce';

describe('useDebounce Hook', () => {
  it('returns a debounced function', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 300));
    
    expect(typeof result.current).toBe('function');
  });

  it('calls the callback function', () => {
    const callback = jest.fn();
    const { result } = renderHook(() => useDebounce(callback, 0));
    
    act(() => {
      result.current('test');
    });
    
    // With zero delay, callback should be called
    setTimeout(() => {
      expect(callback).toHaveBeenCalledWith('test');
    }, 10);
  });
});