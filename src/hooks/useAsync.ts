import { useState, useEffect, useCallback } from 'react';

type AsyncFunction<T> = () => Promise<T>;

interface UseAsyncReturn<T> {
	execute: () => Promise<void>;
	data: T | null;
	isLoading: boolean;
	error: Error | null;
}

function useAsync<T>(asyncFunction: AsyncFunction<T>, immediate = true): UseAsyncReturn<T> {
	const [data, setData] = useState<T | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	const execute = useCallback(async () => {
		setIsLoading(true);
		setData(null);
		setError(null);

		try {
			const response = await asyncFunction();
			setData(response);
		} catch (error) {
			if (error instanceof Error) {
				setError(error);
			} else {
				setError(new Error('An unknown error occurred'));
			}
		} finally {
			setIsLoading(false);
		}
	}, [asyncFunction]);

	useEffect(() => {
		if (immediate) {
			execute();
		}
	}, [execute, immediate]);

	return { execute, data, isLoading, error };
}

export { useAsync };
