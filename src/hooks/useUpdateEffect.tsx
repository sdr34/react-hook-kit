import { useEffect, useRef, EffectCallback, DependencyList } from 'react';

function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void {
	const isInitialMount = useRef(true);

	useEffect(() => {
		if (isInitialMount.current) {
			isInitialMount.current = false;
			return;
		}
		return effect();
	}, deps);
}

export { useUpdateEffect };
