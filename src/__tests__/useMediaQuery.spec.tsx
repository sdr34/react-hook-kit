import { renderHook } from '@testing-library/react-hooks';
import useMediaQuery from '../hooks/useMediaQuery';

describe('useMediaQuery', () => {
	// Mock matchMedia
	beforeAll(() => {
		Object.defineProperty(window, 'matchMedia', {
			writable: true,
			value: jest.fn().mockImplementation((query) => ({
				matches: false,
				media: query,
				onchange: null,
				addEventListener: jest.fn(),
				removeEventListener: jest.fn(),
				dispatchEvent: jest.fn(),
			})),
		});
	});

	it('should return false when media query is not matched', () => {
		const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));

		expect(result.current).toBe(false);
	});

	it('should return initialState when rendered on the server', () => {
		// Mock window to be undefined to simulate server-side rendering
		const originalWindow = global.window;
		// @ts-ignore
		delete global.window;

		const { result } = renderHook(() => useMediaQuery('(min-width: 768px)', true));

		expect(result.current).toBe(true);

		// Restore window
		global.window = originalWindow;
	});
});
