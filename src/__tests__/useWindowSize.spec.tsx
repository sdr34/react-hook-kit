import { renderHook } from '@testing-library/react-hooks';
import useWindowSize from '../hooks/useWindowSize';

describe('useWindowSize', () => {
	it('returns the initial window size', () => {
		const { result } = renderHook(() => useWindowSize());
		expect(result.current.width).toBe(window.innerWidth);
		expect(result.current.height).toBe(window.innerHeight);
	});

	it('updates the size when the window is resized', () => {
		const { result } = renderHook(() => useWindowSize());

		(window.innerWidth as any) = 500;
		(window.innerHeight as any) = 500;
		window.dispatchEvent(new Event('resize'));

		expect(result.current.width).toBe(500);
		expect(result.current.height).toBe(500);
	});
});
