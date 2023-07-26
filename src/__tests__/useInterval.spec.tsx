import { renderHook, act } from '@testing-library/react-hooks';
import { useInterval} from '../hooks/useInterval';

describe('useInterval', () => {
  it('should execute the callback at regular intervals', () => {
    jest.useFakeTimers();

    const callback = jest.fn();
    const delay = 1000;
    const { result } = renderHook(() => useInterval(callback, delay));

    expect(callback).not.toBeCalled();

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(delay);
    });

    expect(callback).toHaveBeenCalledTimes(2);

    jest.useRealTimers();
  });
});