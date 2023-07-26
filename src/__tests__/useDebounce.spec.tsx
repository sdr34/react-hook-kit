import { renderHook, act } from '@testing-library/react-hooks';
import { useEffect } from 'react';
import { useDebounce } from '../hooks/useDebounce'; // Путь к вашему файлу с хуками

describe('useDebounce', () => {
  it('should debounce the function call', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const delay = 500;
    const { result } = renderHook(() => useDebounce(callback, delay, []));

    act(() => {
      result.current();
    });

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(delay);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.useRealTimers();
  });
});
