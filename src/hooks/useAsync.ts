import { useState, useCallback } from 'react';

interface UseAsyncState<T> {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
}

export function useAsync<T, A extends unknown[]>(
	asyncFunction: (...args: A) => Promise<T>,
): UseAsyncState<T> & { execute: (...args: A) => Promise<void> } {
	const [state, setState] = useState<UseAsyncState<T>>({
		data: null,
		isLoading: false,
		error: null,
	});

	const execute = useCallback(
		async (...args: A) => {
			setState({
				data: null,
				isLoading: true,
				error: null,
			});

			try {
				const response = await asyncFunction(...args);
				setState({
					data: response,
					isLoading: false,
					error: null,
				});
			} catch (err: unknown) {
				setState({
					data: null,
					isLoading: false,
					error: err as Error,
				});
			}
		},
		[asyncFunction],
	);

	return {
		...state,
		execute,
	};
}
