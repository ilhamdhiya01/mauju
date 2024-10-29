import React from 'react';
import { render, screen } from '@testing-library/react';
import InputError from '..';

// Mock the Icon component
jest.mock('../../Icon', () => ({
  __esModule: true,
  default: ({ icon, className }: { icon: string; className: string }) => (
    <div data-testid="mock-icon" className={className}>
      {icon}
    </div>
  ),
}));

describe('InputError', () => {
  test('renders error message and icon when errorMessage is provided', () => {
    const errorMessage = 'This is an error';

    render(<InputError errorMessage={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
    expect(screen.getByTestId('mock-icon')).toHaveTextContent(
      'AlertCircleFilled'
    );
  });

  test('does not render anything when errorMessage is empty', () => {
    const { container } = render(<InputError errorMessage="" />);

    expect(container).toBeEmptyDOMElement();
  });

  test('does not render anything when errorMessage is not provided', () => {
    const { container } = render(<InputError errorMessage={null as any} />);

    expect(container).toBeEmptyDOMElement();
  });
});
