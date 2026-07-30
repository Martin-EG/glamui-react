import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';
import PasswordInput from './PasswordInput';

describe('PasswordInput', () => {
  it('renders input with type password initially', () => {
    render(<PasswordInput label="Password" id="pwd" />);
    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('toggles visibility when eye icon is clicked', () => {
    render(
      <PasswordInput
        label="Password"
        id="pwd"
        showLabel="Show"
        hideLabel="Hide"
      />,
    );
    const input = screen.getByLabelText('Password');

    // Initial state: password, showing "Show" button
    expect(input).toHaveAttribute('type', 'password');
    const toggleBtn = screen.getByRole('button', { name: 'Show' });
    expect(toggleBtn).toBeInTheDocument();
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'false');

    // Click toggle
    fireEvent.click(toggleBtn);

    // Now state: text, showing "Hide" button
    expect(input).toHaveAttribute('type', 'text');
    expect(toggleBtn).toHaveAccessibleName('Hide');
    expect(toggleBtn).toHaveAttribute('aria-pressed', 'true');

    // Click again
    fireEvent.click(toggleBtn);
    expect(input).toHaveAttribute('type', 'password');
    expect(toggleBtn).toHaveAccessibleName('Show');
  });

  it('passes error prop to TextInput', () => {
    render(
      <PasswordInput label="Password" id="pwd" error="Invalid password" />,
    );
    expect(screen.getByText('Invalid password')).toBeInTheDocument();
  });
});
