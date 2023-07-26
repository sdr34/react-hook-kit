import { renderHook, act } from '@testing-library/react-hooks';
import { useEffect } from 'react';
import { useThrottle } from '../hooks/useThrottle';

describe('useThrottle', () => {
    it('should throttle the function call', () => {
      jest.useFakeTimers();
  
      const callback = jest.fn();
      const delay = 200;
      const { result } = renderHook(() => useThrottle(callback, delay));
  
      act(() => {
        jest.advanceTimersByTime(delay);
      });
  
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
  
      act(() => {
        jest.advanceTimersByTime(delay);
      });
  
      expect(callback).toHaveBeenCalledTimes(1);
  
      act(() => {
        jest.advanceTimersByTime(delay);
      });
  
      expect(callback).toHaveBeenCalledTimes(2);
  
      jest.useRealTimers();
    });
  });