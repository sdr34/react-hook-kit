import * as React from 'react';
import { useEffect, useRef } from 'react';

const useTimeout = (callback: () => void, delay: number) => {
	const savedCallback = useRef<() => void>();

	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	useEffect(() => {
		const timeout = setTimeout(() => {
			savedCallback.current?.();
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [delay]);
};

export { useTimeout };
