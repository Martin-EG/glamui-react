import { render, screen, fireEvent } from '../../test-utils';

import Clickable from './Clickable';

describe('Clickable', () => {
  it('renders children with button semantics', () => {
    render(<Clickable onClick={jest.fn()}>Card content</Clickable>);

    const element = screen.getByRole('button', { name: 'Card content' });
    expect(element).toBeInTheDocument();
    expect(element.tagName).toBe('DIV');
    expect(element).toHaveAttribute('tabIndex', '0');
  });

  it('calls onClick when clicked', () => {
    const onClick = jest.fn();
    render(<Clickable onClick={onClick}>Card content</Clickable>);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('calls onClick on Enter and Space', () => {
    const onClick = jest.fn();
    render(<Clickable onClick={onClick}>Card content</Clickable>);

    const element = screen.getByRole('button');
    fireEvent.keyDown(element, { key: 'Enter' });
    fireEvent.keyDown(element, { key: ' ' });

    expect(onClick).toHaveBeenCalledTimes(2);
  });

  it('does not call onClick on other keys', () => {
    const onClick = jest.fn();
    render(<Clickable onClick={onClick}>Card content</Clickable>);

    fireEvent.keyDown(screen.getByRole('button'), { key: 'a' });

    expect(onClick).not.toHaveBeenCalled();
  });

  it('is not focusable and does not fire onClick when disabled', () => {
    const onClick = jest.fn();
    render(
      <Clickable onClick={onClick} disabled>
        Card content
      </Clickable>,
    );

    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('tabIndex', '-1');
    expect(element).toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(element);
    fireEvent.keyDown(element, { key: 'Enter' });

    expect(onClick).not.toHaveBeenCalled();
  });
});
