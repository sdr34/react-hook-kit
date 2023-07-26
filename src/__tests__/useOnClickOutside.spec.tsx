import { render, fireEvent } from '@testing-library/react';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

const TestComponent = ({ callback }: { callback: () => void }): JSX.Element => {
	const ref = React.useRef<HTMLDivElement | null>(null);
	useOnClickOutside([ref], callback);
	return <div ref={ref}>Test Element</div>;
};

describe('useOnClickOutside', () => {
	it('should trigger the callback when a click event occurs outside the referenced element', () => {
		const mockCallback = jest.fn();

		render(<TestComponent callback={mockCallback} />);
		act(() => {
			fireEvent.mouseDown(document.body);
		});

		expect(mockCallback).toHaveBeenCalled();
	});

	it('should not trigger the callback when the click event occurs inside the referenced element', () => {
		const mockCallback = jest.fn();

		const { getByText } = render(<TestComponent callback={mockCallback} />);
		const div = getByText('Test Element');
		act(() => {
			fireEvent.mouseDown(div);
		});

		expect(mockCallback).not.toHaveBeenCalled();
	});
});
