type FetchResult<T> = {
	data: T | null;
	isLoading: boolean;
	error: Error | null;
};

declare function useFetch<T = unknown>(url: string, options?: RequestInit): FetchResult<T>;

export default useFetch;
