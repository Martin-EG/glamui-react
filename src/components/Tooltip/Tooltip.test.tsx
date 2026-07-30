import { render, screen, fireEvent } from '../../test-utils';

import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('is not visible until the trigger is hovered', () => {
    render(
      <Tooltip label="Delete product">
        <button>Delete</button>
      </Tooltip>,
    );

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on mouse enter and hides on mouse leave', () => {
    render(
      <Tooltip label="Delete product">
        <button>Delete</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Delete' });
    fireEvent.mouseEnter(trigger);
    expect(screen.getByRole('tooltip')).toHaveTextContent('Delete product');

    fireEvent.mouseLeave(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on keyboard focus and hides on blur, for keyboard-only users', () => {
    render(
      <Tooltip label="Delete product">
        <button>Delete</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Delete' });
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.blur(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('dismisses on Escape while visible', () => {
    render(
      <Tooltip label="Delete product">
        <button>Delete</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Delete' });
    fireEvent.focus(trigger);
    expect(screen.getByRole('tooltip')).toBeInTheDocument();

    fireEvent.keyDown(trigger, { key: 'Escape' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('associates the trigger with the tooltip via aria-describedby', () => {
    render(
      <Tooltip label="Delete product">
        <button>Delete</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Delete' });
    fireEvent.mouseEnter(trigger);

    const tooltip = screen.getByRole('tooltip');
    expect(trigger).toHaveAttribute('aria-describedby', tooltip.id);
  });
});
