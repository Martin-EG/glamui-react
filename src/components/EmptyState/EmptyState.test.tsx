import { render, screen } from '../../test-utils';

import { Search } from '../Icon';

import EmptyState from './EmptyState';

describe('EmptyState', () => {
  it('renders the title, the only required content', () => {
    render(<EmptyState title="Nothing here yet" />);

    expect(screen.getByText('Nothing here yet')).toBeInTheDocument();
  });

  it('does not render a description paragraph when none is given', () => {
    const { container } = render(<EmptyState title="Nothing here yet" />);

    expect(container.querySelectorAll('p')).toHaveLength(1);
  });

  it('renders the description when given', () => {
    render(
      <EmptyState
        title="No matches"
        description="Try a different search term."
      />,
    );

    expect(screen.getByText('Try a different search term.')).toBeInTheDocument();
  });

  it('renders the action as passed, without wrapping it in another interactive element', () => {
    render(
      <EmptyState
        title="Your collection is empty"
        action={<button type="button">Add a product</button>}
      />,
    );

    const action = screen.getByRole('button', { name: 'Add a product' });
    expect(action).toBeInTheDocument();
    expect(action.closest('button')).toBe(action);
  });

  it('hides a decorative icon from assistive tech', () => {
    const { container } = render(
      <EmptyState icon={<Search />} title="No matches" />,
    );

    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});
