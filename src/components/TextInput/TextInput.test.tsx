import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import TextInput from './TextInput';

describe('TextInput', () => {
  it('renders input correctly', () => {
    render(<TextInput placeholder="Enter text" />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with label', () => {
    render(<TextInput label="Username" id="username" />);
    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    render(<TextInput label="Email" id="email" error="Invalid email" />);

    const errorMessage = screen.getByText('Invalid email');
    expect(errorMessage).toBeInTheDocument();

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'email-error');

    expect(errorMessage).toHaveAttribute('id', 'email-error');
  });

  it('renders different variants', () => {
    render(<TextInput variant="password" placeholder="Password" />);
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('handles disabled state', () => {
    render(<TextInput disabled placeholder="Disabled" />);
    const input = screen.getByPlaceholderText('Disabled');
    expect(input).toBeDisabled();

    expect(input).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled',
    });
  });

  it('passes other props to input element', () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} data-testid="test-input" />);

    const input = screen.getByTestId('test-input');
    fireEvent.change(input, { target: { value: 'New Value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
