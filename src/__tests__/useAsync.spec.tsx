import { renderHook, act } from '@testing-library/react-hooks';
import { useAsync } from '../hooks/useAsync';

describe('useAsync hook', () => {
	test('should handle a successful async operation', async () => {
		const mockAsyncFunction = jest.fn().mockResolvedValue('test data');
		const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsyncFunction));

		expect(result.current.isLoading).toBe(true);

		await waitForNextUpdate();

		expect(mockAsyncFunction).toHaveBeenCalled();
		expect(result.current.data).toBe('test data');
		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBeNull();
	});

	test('should handle an error in async operation', async () => {
		const mockError = new Error('Test error');
		const mockAsyncFunction = jest.fn().mockRejectedValue(mockError);
		const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsyncFunction));

		await waitForNextUpdate();

		expect(mockAsyncFunction).toHaveBeenCalled();
		expect(result.current.error).toBe(mockError);
		expect(result.current.isLoading).toBe(false);
		expect(result.current.data).toBeNull();
	});

	test('initial state should be correct', () => {
		const mockAsyncFunction = jest.fn();
		const { result } = renderHook(() => useAsync(mockAsyncFunction, false));

		expect(result.current.isLoading).toBe(false);
		expect(result.current.error).toBeNull();
		expect(result.current.data).toBeNull();
	});

	test('execute function triggers the async operation', async () => {
		const mockAsyncFunction = jest.fn().mockResolvedValue('new data');
		const { result, waitForNextUpdate } = renderHook(() => useAsync(mockAsyncFunction, false));

		act(() => {
			result.current.execute();
		});

		expect(result.current.isLoading).toBe(true);

		await waitForNextUpdate();

		expect(mockAsyncFunction).toHaveBeenCalledTimes(1);
		expect(result.current.data).toBe('new data');
		expect(result.current.isLoading).toBe(false);
	});
});
