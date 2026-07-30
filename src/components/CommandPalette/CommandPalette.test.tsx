import { render, screen, fireEvent } from '../../test-utils';

import CommandPalette from './CommandPalette';

const items = [
  { id: 'edit', label: 'Edit product', onSelect: jest.fn() },
  { id: 'delete', label: 'Delete product', onSelect: jest.fn() },
  { id: 'wishlist', label: 'Move to wishlist', onSelect: jest.fn() },
];

describe('CommandPalette', () => {
  afterEach(() => {
    items.forEach((item) => (item.onSelect as jest.Mock).mockClear());
  });

  it('renders nothing when closed', () => {
    render(<CommandPalette isOpen={false} onClose={jest.fn()} items={items} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders all items and focuses the search input when open', () => {
    render(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
    expect(screen.getByRole('searchbox')).toHaveFocus();
  });

  it('filters items as the query changes', () => {
    render(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'delete' },
    });

    expect(screen.getAllByRole('menuitem')).toHaveLength(1);
    expect(screen.getByText('Delete product')).toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', () => {
    render(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'nonexistent action' },
    });

    expect(screen.getByText('No matching actions')).toBeInTheDocument();
    expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();
  });

  it('calls onSelect and onClose when an item is clicked', () => {
    const onClose = jest.fn();
    render(<CommandPalette isOpen onClose={onClose} items={items} />);

    fireEvent.click(screen.getByText('Edit product'));

    expect(items[0].onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape', () => {
    const onClose = jest.fn();
    render(<CommandPalette isOpen onClose={onClose} items={items} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking the backdrop, not the panel', () => {
    const onClose = jest.fn();
    render(<CommandPalette isOpen onClose={onClose} items={items} />);

    fireEvent.mouseDown(screen.getByRole('dialog'));
    expect(onClose).not.toHaveBeenCalled();

    fireEvent.mouseDown(screen.getByRole('dialog').parentElement as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('moves focus from the search input to the first item on ArrowDown', () => {
    render(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    fireEvent.keyDown(screen.getByRole('searchbox'), { key: 'ArrowDown' });
    expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();
  });

  it('moves focus between items with arrow keys, and back to the input from the first item', () => {
    render(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[0].focus();

    fireEvent.keyDown(menuItems[0], { key: 'ArrowDown' });
    expect(menuItems[1]).toHaveFocus();

    fireEvent.keyDown(menuItems[1], { key: 'ArrowUp' });
    expect(menuItems[0]).toHaveFocus();

    fireEvent.keyDown(menuItems[0], { key: 'ArrowUp' });
    expect(screen.getByRole('searchbox')).toHaveFocus();
  });

  it('selects the focused item on Enter', () => {
    const onClose = jest.fn();
    render(<CommandPalette isOpen onClose={onClose} items={items} />);

    const menuItems = screen.getAllByRole('menuitem');
    menuItems[1].focus();
    fireEvent.keyDown(menuItems[1], { key: 'Enter' });

    expect(items[1].onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('clears the query each time it reopens', () => {
    const { rerender } = render(
      <CommandPalette isOpen onClose={jest.fn()} items={items} />,
    );

    fireEvent.change(screen.getByRole('searchbox'), {
      target: { value: 'delete' },
    });
    expect(screen.getAllByRole('menuitem')).toHaveLength(1);

    rerender(<CommandPalette isOpen={false} onClose={jest.fn()} items={items} />);
    rerender(<CommandPalette isOpen onClose={jest.fn()} items={items} />);

    expect(screen.getByRole('searchbox')).toHaveValue('');
    expect(screen.getAllByRole('menuitem')).toHaveLength(3);
  });
});
