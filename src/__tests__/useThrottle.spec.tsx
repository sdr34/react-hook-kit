import { renderHook, act } from '@testing-library/react-hooks';
import { useEffect } from 'react';
import { useDebounce, useThrottle } from '../hooks/useThrottle';

describe('useThrottle', () => {
    it('should throttle the function call', () => {
      jest.useFakeTimers();
  
      const callback = jest.fn();
      const delay = 200;
      const { result } = renderHook(() => useThrottle(callback, delay, []));
  
      act(() => {
        result.current();
      });
  
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
  
      act(() => {
        result.current();
      });
  
      expect(callback).toHaveBeenCalledTimes(1);
  
      jest.advanceTimersByTime(delay);
  
      act(() => {
        result.current();
      });
  
      expect(callback).toHaveBeenCalledTimes(2);
  
      jest.useRealTimers();
    });
  });