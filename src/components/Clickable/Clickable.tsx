import { forwardRef, KeyboardEvent } from 'react';

import type { ClickableProps } from './Clickable.types';

/**
 * A `<div>` that behaves like a button: use it when a clickable area needs
 * layout (e.g. a card with an icon, title, and subtitle stacked vertically)
 * that the `Button` component's fixed row layout can't express. Adds the
 * keyboard/ARIA semantics a native `<button>` gives you for free.
 */
const Clickable = forwardRef<HTMLDivElement, ClickableProps>(
  ({ onClick, disabled = false, onKeyDown, style, ...props }, ref) => {
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(event);

      if (disabled || event.defaultPrevented) {
        return;
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onClick();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        onClick={disabled ? undefined : onClick}
        onKeyDown={handleKeyDown}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', ...style }}
        {...props}
      />
    );
  },
);

Clickable.displayName = 'Clickable';

export default Clickable;
