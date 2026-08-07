import { render, screen } from '../../test-utils';
import 'jest-styled-components';

import Badge from './Badge';

describe('Badge content', () => {
  it('renders children as visible content', () => {
    render(<Badge>3</Badge>);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('truncates a numeric value above max', () => {
    render(<Badge max={99}>{150}</Badge>);
    expect(screen.getByText('99+')).toBeInTheDocument();
  });

  it('does not truncate a numeric value at or below max', () => {
    render(<Badge max={99}>{42}</Badge>);
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    const { container } = render(<Badge variant="error">1</Badge>);
    expect(container.firstChild).toHaveClass('badge-error');
  });
});

describe('Badge accessibility', () => {
  it('exposes role status by default', () => {
    render(<Badge>3</Badge>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('announces the accessible label instead of the raw content', () => {
    render(<Badge label="99 plus unread messages">99+</Badge>);

    const status = screen.getByRole('status');
    expect(status).toHaveTextContent('99 plus unread messages');

    const visibleContent = screen.getByText('99+');
    expect(visibleContent).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders a dot badge as decorative when no label is given', () => {
    const { container } = render(<Badge dot />);
    const dot = container.firstChild as HTMLElement;

    expect(dot).toHaveAttribute('aria-hidden', 'true');
    expect(dot).not.toHaveAttribute('role');
  });

  it('renders a dot badge with an accessible label when provided', () => {
    render(<Badge dot label="New notifications" />);

    const dot = screen.getByRole('status');
    expect(dot).toHaveAccessibleName('New notifications');
  });
});
