# SegmentedControl Component

A row of mutually-exclusive options, for switching between views or filters (e.g. Grid/List, All/Wishlist/Collections). Fully controlled — the consumer owns the selected value.

## Usage

```tsx
import { useState } from 'react';
import SegmentedControl from '../SegmentedControl';

const MyComponent = () => {
  const [view, setView] = useState('grid');

  return (
    <SegmentedControl
      options={[
        { label: 'Grid', value: 'grid' },
        { label: 'List', value: 'list' },
      ]}
      value={view}
      onChange={setView}
      aria-label="View"
    />
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop          | Type                          | Default | Required | Description                                             |
| :------------ | :----------------------------- | :------ | :------: | :-------------------------------------------------------- |
| `options`     | `{ label: string; value: string }[]` | -       |   Yes    | The available options.                                     |
| `value`       | `string`                       | -       |   Yes    | The currently selected value.                               |
| `onChange`    | `(value: string) => void`      | -       |   Yes    | Called with the new value when a segment is selected.        |
| `aria-label`  | `string`                       | -       |   Yes    | Accessible name for the control (no visible label of its own). |

Implements the standard `radiogroup`/`radio` keyboard pattern: Left/Right arrow keys move the selection and follow it with focus (roving `tabindex` — only the selected segment is a tab stop).

## Foundation notes

The selected-segment treatment reuses the same pattern `DateInput`'s selected day uses: `brand.primary` background, `text.onBrand` label. That pairing was originally built on `text.inverse` in both components — re-verified afterward and found to fail WCAG AA in the light theme (white text on `#EA638C` measures 3.15:1). `colors.text.onBrand` was added to fix it correctly (both this component and `DateInput` now use it); see the changelog for the full account. The control height reuses `size.field` — the same token `TextInput`, `Select`, and `DateInput` use for their own height, which is what this token being named for what it *is* rather than where it's used was supposed to make possible.
