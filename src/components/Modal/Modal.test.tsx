import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders title and children', () => {
    render(
      <Modal onConfirm={mockOnConfirm} title="Test Modal">
        <p>Modal Content</p>
      </Modal>,
    );

    expect(
      screen.getByRole('heading', { name: 'Test Modal' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('renders default button texts', () => {
    render(<Modal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);

    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders custom button texts', () => {
    render(
      <Modal
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
        onClose={mockOnClose}
        closeLabel="Close modal"
        cancelText="Close"
        confirmText="Save Changes"
      />,
    );

    expect(
      screen.getByRole('button', { name: 'Close modal' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Save Changes' }),
    ).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button clicked', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
  });

  it('disables confirm button and renders loading animation when confirmLoading is true', () => {
    render(
      <Modal
        onConfirm={mockOnConfirm}
        confirmText="Save Changes"
        confirmLoading
        confirmLoadingLabel="Saving changes"
      />,
    );

    const confirmButton = screen.getByRole('button', {
      name: 'Saving changes',
    });
    expect(confirmButton).toBeDisabled();
    expect(
      confirmButton.querySelector('[aria-hidden="true"]'),
    ).toBeInTheDocument();

    fireEvent.click(confirmButton);

    expect(mockOnConfirm).not.toHaveBeenCalled();
  });

  it('calls onCancel when cancel button clicked', () => {
    render(<Modal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when close button clicked', () => {
    render(<Modal onConfirm={mockOnConfirm} onClose={mockOnClose} />);
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not submit a parent form when a modal action is clicked', () => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
    const onSubmit = jest.fn((event) => event.preventDefault());

    render(
      <form onSubmit={onSubmit}>
        <Modal onConfirm={mockOnConfirm} onCancel={mockOnCancel} />
      </form>,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('does not render cancel button if onCancel is not provided', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    expect(screen.queryByText('Cancel')).not.toBeInTheDocument();
  });

  it('has dialog role', () => {
    render(<Modal onConfirm={mockOnConfirm} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });
});
