import { renderHook, act } from '@testing-library/react-hooks';
import { useDebounce } from '../hooks/useDebounce'; // Путь к вашему файлу с хуками  

describe('useDebounce', () => {
    it('should debounce the function call', () => {
      jest.useFakeTimers();
      const callback = jest.fn();
      const delay = 500;
  
      renderHook(() => useDebounce(callback, delay, []));
  
      act(() => {
        jest.advanceTimersByTime(delay);
      });
  
      expect(callback).toBeCalled();
      expect(callback).toHaveBeenCalledTimes(1);
  
      jest.useRealTimers();
    });
  });