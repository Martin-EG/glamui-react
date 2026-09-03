# Button Component

The `Button` component is a versatile UI element used for triggering actions. It supports various variants, sizes, shapes, and icon integration.

## Usage

```tsx
import Button from '../Button';
import { Camera } from '../Icon';

const MyComponent = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* Default Button */}
      <Button onClick={() => console.log('Clicked')}>Click Me</Button>

      {/* Button with variant and size */}
      <Button variant="secondary" size="lg">
        Secondary Large
      </Button>

      {/* Button with icon */}
      <Button icon={<Camera />}>Capture</Button>
    </div>
  );
};
```

You can see live demos and usage in Storybook.

## Props

All standard HTML button attributes are also supported (e.g., `disabled`, `onClick`, `type`).

| Prop           | Type                                                                 | Default     | Required | Description                                                     |
| -------------- | -------------------------------------------------------------------- | ----------- | :------: | --------------------------------------------------------------- |
| `variant`      | `'primary' \| 'secondary' \| 'danger' \| 'outline' \| 'transparent'` | `'primary'` |    No    | The visual style of the button.                                 |
| `size`         | `'xs' \| 'sm' \| 'md' \| 'lg'`                                       | `'md'`      |    No    | The size of the button.                                         |
| `rounded`      | `'full' \| 'semi'`                                                   | `'semi'`    |    No    | The border radius style. `'full'` creates a pill shape.         |
| `fullSize`     | `boolean`                                                            | `false`     |    No    | If `true`, the button takes up the full width of its container. |
| `icon`         | `ReactNode`                                                          | `undefined` |    No    | An icon element to display within the button.                   |
| `iconPosition` | `'start' \| 'end'`                                                   | `'start'`   |    No    | The position of the icon relative to the text.                  |
| `children`     | `ReactNode`                                                          | `undefined` |    No    | The content to display inside the button.                       |

## Features

### Variants

The component supports multiple visual variants to communicate different actions or hierarchy:

- `primary`: Main call to action.
- `secondary`: Alternative actions.
- `danger`: Destructive actions.
- `outline`: Less prominent actions with a border.
- `transparent`: Minimalist look, usually text-only or icon-only.

### With Icons

You can easily add icons to buttons using the `icon` prop. By default, the icon appears at the start (left) of the text. Use `iconPosition="end"` to place it on the right.

```tsx
<Button icon={<Camera />}>Start Icon</Button>
<Button icon={<Camera />} iconPosition="end">End Icon</Button>
```

## Foundation notes

`Button`'s four per-size heights (`xs`/`sm`/`md`/`lg`) used to be raw, unreferenced literals (`36px`/`40px`/`44px`/`48px`) in `Button.styles.ts` — no token behind them, and `md`'s `44px` silently duplicated `theme.size.minTouchTarget` without referencing it. `Searchbar` separately hardcoded its own `36px`, the same value as `Button`'s `xs`, with no shared name tying the two together.

Fixed by naming the scale as a semantic token, `theme.size.control.{xs,sm,md,lg}` (`src/tokens/size.ts`), and introducing `Button.tokens.ts` — GlamUI's first component-token file, per `docs/TOKEN_ARCHITECTURE.md`'s Layer 2. `Button.styles.ts` now reads its heights through `buttonTokens.height(theme, size)` instead of inline literals; `Searchbar.styles.ts` reads the same `theme.size.control.xs` directly, so the two components can no longer drift out of sync silently.
