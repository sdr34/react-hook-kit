import { useState, useEffect, useRef, RefObject } from 'react';

function useHover<T extends HTMLElement>(): [RefObject<T>, boolean] {
	const [isHovered, setIsHovered] = useState(false);
	const ref = useRef<T>(null);

	const handleMouseOver = (): void => setIsHovered(true);
	const handleMouseOut = (): void => setIsHovered(false);

	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener('mouseover', handleMouseOver);
			node.addEventListener('mouseout', handleMouseOut);

			return (): void => {
				node.removeEventListener('mouseover', handleMouseOver);
				node.removeEventListener('mouseout', handleMouseOut);
			};
		}
	}, []);

	return [ref, isHovered];
}

export { useHover };
