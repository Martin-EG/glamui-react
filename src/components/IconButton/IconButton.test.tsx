import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import IconButton from './IconButton';

describe('IconButton', () => {
  const defaultProps = {
    icon: <span data-testid="test-icon" />,
    label: 'Test Button',
  };

  it('renders with icon and label', () => {
    render(<IconButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();

    expect(screen.getByTestId('test-icon')).toBeInTheDocument();

    expect(button).toHaveAttribute('title', 'Test Button');
    expect(button).toHaveStyleRule('background', 'transparent');
    expect(button).toHaveStyleRule('border', 'none');
    expect(button).toHaveStyleRule('cursor', 'pointer');
    expect(button).toHaveStyleRule('display', 'inline-flex');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<IconButton {...defaultProps} onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('handles disabled state', () => {
    const handleClick = jest.fn();
    render(<IconButton {...defaultProps} disabled onClick={handleClick} />);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeDisabled();

    expect(button).toHaveStyleRule('opacity', '0.5', { modifier: ':disabled' });
    expect(button).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
