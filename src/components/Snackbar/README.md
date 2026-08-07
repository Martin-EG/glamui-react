# Snackbar Component

The `Snackbar` component is a transient notification (a "toast") anchored to the bottom of the viewport, used to confirm the result of an action, optionally with an inline action such as "Undo".

## Usage

```tsx
import { useState } from 'react';
import Snackbar from '../Snackbar';

const MyComponent = () => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      message="Note archived"
      action={{ label: 'Undo', onClick: () => {/* restore */} }}
      dismissible
      onClose={() => setOpen(false)}
    />
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop                | Type                                                          | Default     | Required | Description                                                                 |
| :------------------- | :-------------------------------------------------------------- | :---------- | :------: | :----------------------------------------------------------------------------- |
| `message`            | `string`                                                         | —           |   Yes    | The text to display.                                                            |
| `open`                | `boolean`                                                        | —           |   Yes    | Controls mount/visibility. The Snackbar renders nothing when `false`.          |
| `variant`             | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'`      | `'default'` |    No    | The visual style of the snackbar.                                              |
| `action`              | `{ label: string; onClick: () => void }`                        | `undefined` |    No    | An optional inline action, e.g. Undo.                                          |
| `dismissible`         | `boolean`                                                        | `false`     |    No    | If `true`, a close button is rendered.                                         |
| `dismissAriaLabel`    | `string`                                                         | `'Close'`   |    No    | Accessible label for the close button.                                         |
| `onClose`             | `() => void`                                                     | `undefined` |    No    | Called when the close button is clicked, Escape is pressed, or the auto-hide timer elapses. |
| `autoHideDuration`    | `number`                                                         | `undefined` |    No    | Milliseconds before `onClose` is called automatically. Omit to require manual dismissal. |

## Accessibility

- **Announced by voice**: the root carries `role="status"`/`aria-live="polite"` by default, and switches to `role="alert"`/`aria-live="assertive"` for the `error` variant so it interrupts immediately. `aria-atomic="true"` ensures the whole message — not just the changed part — is read.
- **Accessible by taps**: the action and dismiss controls are real `<button>` elements sized to the shared `theme.size.minTouchTarget` (44px) touch target, so they're reliably tappable, not just clickable with a mouse.
- **Focus trap on announce**: opening the Snackbar moves focus onto its first control (the action button, then the dismiss button, falling back to the snackbar panel itself if neither exists), and traps Tab/Shift+Tab between its controls while it's open — so keyboard and screen-reader users land on it immediately instead of having to hunt for it, and can't tab past it into the page underneath. Escape closes it, and focus is restored to whatever was focused before it opened. See `hooks/useSnackbarFocusTrap.ts`.
- **Contrast**: the message and controls always use the `surface.inverse` / `text.inverse` token pairing (the same one `Tooltip` uses), already verified at WCAG AA in both themes. Variant identity is conveyed by a left accent bar plus the `role`/`aria-live` change above — not by swapping text color on a dark background — so no variant introduces an unverified color pairing.
