import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';
import Snackbar from './Snackbar';

describe('Snackbar', () => {
  it('renders nothing when closed', () => {
    const { container } = render(
      <Snackbar open={false} message="Note archived" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the message when open', () => {
    render(<Snackbar open message="Note archived" />);
    expect(screen.getByText('Note archived')).toBeInTheDocument();
  });

  it('uses role="status" and polite live region by default', () => {
    render(<Snackbar open message="Note archived" />);
    const region = screen.getByRole('status');
    expect(region).toHaveAttribute('aria-live', 'polite');
  });

  it('uses role="alert" and assertive live region for the error variant', () => {
    render(<Snackbar open message="Something failed" variant="error" />);
    const region = screen.getByRole('alert');
    expect(region).toHaveAttribute('aria-live', 'assertive');
  });

  it('renders and triggers the action button by click (tap)', () => {
    const onAction = jest.fn();
    render(
      <Snackbar
        open
        message="Note archived"
        action={{ label: 'Undo', onClick: onAction }}
      />,
    );

    const actionButton = screen.getByRole('button', { name: 'Undo' });
    fireEvent.click(actionButton);
    expect(onAction).toHaveBeenCalledTimes(1);
  });

  it('renders and triggers the dismiss button by click (tap)', () => {
    const onClose = jest.fn();
    render(
      <Snackbar open message="Note archived" dismissible onClose={onClose} />,
    );

    const dismissButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(dismissButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('supports a custom dismiss aria-label', () => {
    render(
      <Snackbar
        open
        message="Note archived"
        dismissible
        dismissAriaLabel="Dismiss notification"
        onClose={jest.fn()}
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Dismiss notification' }),
    ).toBeInTheDocument();
  });

  it('traps focus on the action button when opened', () => {
    render(
      <Snackbar
        open
        message="Note archived"
        action={{ label: 'Undo', onClick: jest.fn() }}
        dismissible
      />,
    );

    expect(screen.getByRole('button', { name: 'Undo' })).toHaveFocus();
  });

  it('closes on Escape while open', () => {
    const onClose = jest.fn();
    render(
      <Snackbar open message="Note archived" onClose={onClose} dismissible />,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose automatically after autoHideDuration', () => {
    jest.useFakeTimers();
    const onClose = jest.fn();
    render(
      <Snackbar
        open
        message="Note archived"
        onClose={onClose}
        autoHideDuration={3000}
      />,
    );

    expect(onClose).not.toHaveBeenCalled();
    jest.advanceTimersByTime(3000);
    expect(onClose).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });
});
