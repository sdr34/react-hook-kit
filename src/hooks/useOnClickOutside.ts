import { RefObject, useEffect, MouseEvent as ReactMouseEvent } from 'react';

type EventType = MouseEvent | TouchEvent;

export const useOnClickOutside = (
	refs: RefObject<HTMLElement>[],
	callback: () => void,
	condition: boolean = true,
): void => {
	useEffect(() => {
		const handleClickOutside = (event: EventType): void => {
			if (
				condition &&
				refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))
			) {
				callback();
			}
		};

		// Bind the listener to the document
		const boundListener = handleClickOutside.bind(document);

		document.addEventListener('mousedown', boundListener);
		return () => {
			document.removeEventListener('mousedown', boundListener);
		};
	}, [refs, callback, condition]);
};
