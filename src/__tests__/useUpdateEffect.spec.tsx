import { renderHook } from '@testing-library/react-hooks';
import { useUpdateEffect } from '../hooks/useUpdateEffect';

describe('useUpdateEffect', () => {
	it('should not call effect on initial mount', () => {
		const effect = jest.fn();
		renderHook(() => useUpdateEffect(effect, []));

		expect(effect).not.toHaveBeenCalled();
	});

	it('should call effect on update', () => {
		const effect = jest.fn();
		const { rerender } = renderHook(({ count }) => useUpdateEffect(effect, [count]), {
			initialProps: { count: 0 },
		});

		rerender({ count: 1 });
		expect(effect).toHaveBeenCalledTimes(1);
	});
});
