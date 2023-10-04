import { useState, useEffect } from 'react';

const useMediaQuery = (query: string, initialState: boolean = false): boolean => {
	const isClient = typeof window === 'object';

	const [matches, setMatches] = useState<boolean>(() => {
		if (isClient) {
			return window.matchMedia(query).matches;
		}
		return initialState;
	});

	useEffect(() => {
		if (!isClient) {
			return undefined;
		}

		const mediaQueryList = window.matchMedia(query);
		const handleMediaQueryChange = (event: MediaQueryListEvent) => {
			setMatches(event.matches);
		};
		setMatches(mediaQueryList.matches);
		mediaQueryList.addEventListener('change', handleMediaQueryChange);
		return () => {
			mediaQueryList.removeEventListener('change', handleMediaQueryChange);
		};
	}, [query, isClient]);

	return matches;
};

export default useMediaQuery;
