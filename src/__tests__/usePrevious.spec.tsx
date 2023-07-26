import { renderHook, act } from '@testing-library/react-hooks';
import { useState, useRef, useEffect} from 'react';

function usePrevious<T>(value: T): T | undefined {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    }, [value]);
    return ref.current;
  }
describe('usePrevious', () => {
  it('should return the previous value', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const previousCount = usePrevious(count);

      return { count, previousCount, setCount };
    });

    act(() => {
      result.current.setCount(5);
    });

    expect(result.current.count).toBe(5);
    expect(result.current.previousCount).toBe(0);

    act(() => {
      result.current.setCount(10);
    });

    expect(result.current.count).toBe(10);
    expect(result.current.previousCount).toBe(5);
  });

  it('should return undefined if there is no previous value', () => {
    const { result } = renderHook(() => {
      const [count, setCount] = useState(0);
      const previousCount = usePrevious(count);

      return { count, previousCount, setCount };
    });

    expect(result.current.count).toBe(0);
    expect(result.current.previousCount).toBeUndefined();

    act(() => {
      result.current.setCount(5);
    });

    expect(result.current.count).toBe(5);
    expect(result.current.previousCount).toBe(0);
  });
});