# CommandPalette Component

A searchable, keyboard-navigable overlay for jumping straight to an action (the ⌘K pattern) — a backdrop, a search input, and a filtered list of commands.

## Usage

```tsx
import { useState } from 'react';
import CommandPalette from '../CommandPalette';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      items={[
        { id: 'edit', label: 'Edit product', onSelect: () => {} },
        { id: 'delete', label: 'Delete product', onSelect: () => {} },
      ]}
    />
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop          | Type                  | Default              | Required | Description                                    |
| :------------ | :--------------------- | :--------------------- | :------: | :------------------------------------------------ |
| `isOpen`      | `boolean`              | -                       |   Yes    | Whether the palette is open.                        |
| `onClose`     | `() => void`           | -                       |   Yes    | Called on Escape, backdrop click, or item selection.  |
| `items`       | `CommandPaletteItem[]` | -                       |   Yes    | `{ id, label, icon?, onSelect }[]`.                  |
| `placeholder` | `string`               | `'Search actions…'`    |    No    | Search input placeholder.                            |

Keyboard: type to filter, `↓` from the input to the first result, `↑`/`↓` between results, `↑` from the first result back to the input, `Enter` to select, `Escape` to close.

## Foundation notes

This is the first component in the library with a real focus trap (`hooks/useFocusTrap.ts`) — initial focus, `Tab`/`Shift+Tab` cycling confined to the panel, body scroll lock while open, and focus returned to whatever was focused before opening. `Modal` was flagged as missing exactly this in the original design-system audit; it still is. This implementation is deliberately self-contained to `CommandPalette` rather than promoted to a shared hook — whether `Modal` should adopt the same fix is a decision about `Modal`, not one this component should make on its behalf.

Two more tokens were promoted while building this: `colors.overlay.scrim` and `colors.overlay.loading`, both previously hardcoded literals living only inside `Modal.styles.ts` and `LoadingOverlay.tsx`. This component needed the identical scrim value `Modal` already used — the second independent use the extensibility rule asks for. `effects.blur.sm` was promoted the same way, from `LoadingOverlay`'s previously one-off `backdropFilter: blur(2px)`.
