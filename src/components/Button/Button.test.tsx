import { render, screen } from '../../test-utils';
import 'jest-styled-components';

import { User } from '../Icon';

import Button from './Button';

describe('Button variants', () => {
  it('renders primary variant by default', () => {
    render(<Button>Primary</Button>);

    const button = screen.getByRole('button', { name: /primary/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('btn-primary');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button', { name: /secondary/i });

    expect(button).toHaveClass('btn-secondary');
  });

  it('renders danger variant', () => {
    render(<Button variant="danger">Delete</Button>);

    const button = screen.getByRole('button', { name: /delete/i });

    expect(button).toHaveClass('btn-danger');
  });

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole('button', { name: /outline/i });

    expect(button).toHaveClass('btn-outline');
  });

  it('renders transparent variant', () => {
    render(<Button variant="transparent">Transparent</Button>);

    const button = screen.getByRole('button', { name: /transparent/i });

    expect(button).toHaveClass('btn-transparent');
  });

  it('renders full size button', () => {
    const { container } = render(<Button fullSize>Full Size</Button>);

    expect(
      screen.getByRole('button', { name: /full size/i }),
    ).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('width: 100%');
  });

  it('renders semi rounded button', () => {
    render(<Button rounded="semi">Semi Rounded</Button>);

    const button = screen.getByRole('button', { name: /semi rounded/i });

    expect(button).toHaveClass('btn-semi');
  });

  it('renders full rounded button', () => {
    render(<Button rounded="full">Full Rounded</Button>);

    const button = screen.getByRole('button', { name: /full rounded/i });

    expect(button).toHaveClass('btn-full');
  });
});

describe('Button with icon', () => {
  it('renders icon', () => {
    render(<Button icon={<User />}>Save</Button>);

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('renders icon at the end', () => {
    const { container } = render(
      <Button icon={<User />} iconPosition="end">
        Save
      </Button>,
    );

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
    expect(container.firstChild).toHaveStyle('flex-direction: row-reverse');
  });
});

describe('Button accessibility', () => {
  it('is accessible by role', () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument();
  });

  it('can be disabled', () => {
    render(<Button disabled>Save</Button>);

    const button = screen.getByRole('button', { name: /save/i });

    expect(button).toBeDisabled();
  });

  it('supports accessible icon-only buttons', () => {
    render(
      <Button aria-label="Open menu">
        <span aria-hidden />
      </Button>,
    );

    expect(
      screen.getByRole('button', { name: /open menu/i }),
    ).toBeInTheDocument();
  });
});
