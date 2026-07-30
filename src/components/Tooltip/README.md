# Tooltip Component

A short hint that appears near a trigger element on hover or keyboard focus. Wraps a single child; no changes are needed to the child itself.

## Usage

```tsx
import Tooltip from '../Tooltip';
import IconButton from '../IconButton';
import { Edit } from '../Icon';

const MyComponent = () => (
  <Tooltip label="Edit this product" placement="bottom">
    <IconButton icon={<Edit />} label="Edit" />
  </Tooltip>
);
```

You can see live demos and usage in Storybook.

## Props

| Prop        | Type                                       | Default | Required | Description                                            |
| :---------- | :------------------------------------------ | :------ | :------: | :------------------------------------------------------ |
| `label`     | `ReactNode`                                 | -       |   Yes    | The tooltip's content.                                   |
| `children`  | `ReactElement`                              | -       |   Yes    | A single element that triggers the tooltip.               |
| `placement` | `'top' \| 'bottom' \| 'left' \| 'right'`     | `'top'` |    No    | Which side of the trigger the tooltip appears on.          |

## Foundation notes

Tooltip surfaced two real gaps in the token system, both fixed rather than worked around:

- **`colors.surface.inverse`** — every other floating element (Menu, Modal, DateInput's popover) uses the theme's own surface tone, but a tooltip needs to read clearly regardless of what's behind it, which conventionally means inverting polarity. This pairs with the already-existing `colors.text.inverse`.
- **`zIndex.tooltip`** — there was no stacking layer above `popover` for something that needs to render above any other floating content, including a `Modal` or an open `Menu`.
