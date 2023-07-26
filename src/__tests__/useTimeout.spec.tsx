import { renderHook, act } from '@testing-library/react-hooks';
import { useTimeout } from '../hooks/useTimeout'; // Путь к вашему файлу с хуками

describe('useTimeout', () => {
	it('should delay the execution of the callback', () => {
		jest.useFakeTimers();

		const callback = jest.fn();
		const delay = 2000;
		const { result } = renderHook(() => useTimeout(callback, delay));

		expect(callback).not.toBeCalled();

		act(() => {
			jest.advanceTimersByTime(delay);
		});

		expect(callback).toBeCalled();
		expect(callback).toHaveBeenCalledTimes(1);

		jest.useRealTimers();
	});
});
