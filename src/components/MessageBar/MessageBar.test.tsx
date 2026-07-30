import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';
import MessageBar from './MessageBar';

describe('MessageBar', () => {
  it('renders nothing when message is undefined', () => {
    const { container } = render(<MessageBar message={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders message when provided', () => {
    render(<MessageBar message="Test Message" />);
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('renders success variant', () => {
    const { container } = render(
      <MessageBar message="Success" variant="success" />,
    );
    const text = container.querySelector('.text-success');
    expect(text).toBeInTheDocument();
  });

  it('renders error variant and focuses it', () => {
    const { container } = render(
      <MessageBar message="Error" variant="error" />,
    );

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('tabIndex', '-1');

    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('renders dismiss button when dismissible', () => {
    const mockDismiss = jest.fn();
    render(
      <MessageBar
        message="Dismiss me"
        dismissible
        dismissMessageBar={mockDismiss}
      />,
    );

    const closeBtn = screen.getByText('×');
    expect(closeBtn).toBeInTheDocument();

    fireEvent.click(closeBtn);
    expect(mockDismiss).toHaveBeenCalledTimes(1);
  });
});
