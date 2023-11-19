import React from 'react';
import { render, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useHover } from '../hooks/useHover';

describe('useHover', () => {
	it('should return initial state as false', () => {
		const { result } = renderHook(() => useHover());
		const [ref, isHovered] = result.current;

		expect(ref.current).toBeNull();
		expect(isHovered).toBe(false);
	});

	it('should detect mouseover and mouseout events', () => {
		const TestComponent = (): JSX.Element => {
			const [hoverRef, isHovered] = useHover<HTMLDivElement>();

			return <div ref={hoverRef}>{isHovered ? 'Hovered' : 'Not hovered'}</div>;
		};

		const { getByText } = render(<TestComponent />);
		const hoverElement = getByText('Not hovered');

		act(() => {
			hoverElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
		});

		expect(getByText('Hovered')).toBeTruthy();

		act(() => {
			hoverElement.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
		});

		expect(getByText('Not hovered')).toBeTruthy();
	});
});
