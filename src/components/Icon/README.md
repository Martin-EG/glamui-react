# Icon Components

This directory contains a collection of SVG icon components used throughout the GlamVault application.

## Available Icons

The following icons are available for import:

- `Box`
- `Camera`
- `Edit`
- `Exit`
- `Eye`
- `EyeOff`
- `Heart`
- `Image`
- `Remove`
- `Star`
- `Upload`
- `User`

## Usage

You can import icons directly from the `Icon` directory.

```tsx
import { Camera, Heart } from '../Icon';

const MyComponent = () => {
  return (
    <div>
      <Camera size="md" color="black" />
      <Heart size="lg" color="red" />
    </div>
  );
};
```

## Props

All icons accept the following props:

| Prop          | Type       | Default          | Description                                          |
| ------------- | ---------- | ---------------- | ---------------------------------------------------- |
| `size`        | `IconSize` | `'sm'`           | The size of the icon.                                |
| `color`       | `string`   | `'currentColor'` | The stroke color of the icon. Accepts any CSS color. |
| `strokeWidth` | `number`   | `1.5`            | The thickness of the icon stroke.                    |
| `className`   | `string`   | `undefined`      | Additional CSS class names.                          |
| `title`       | `string`   | `undefined`      | Accessible title for screen readers.                 |

### Icon Sizes

The `size` prop accepts the following values, which map to pixel dimensions (defined in `Icon.types.ts`):

- `xs`: 12px
- `sm`: 16px
- `md`: 20px
- `lg`: 24px
- `xl`: 28px

## Adding New Icons

This library uses a Wrapper Pattern where individual icons (like `Camera` or `Heart`) wrap a base `Icon` component. This ensures consistent sizing, coloring, and accessibility features (like unique IDs for titles).

To add a new icon:

1.  Create a new `.tsx` file in this directory (e.g., `MyNewIcon.tsx`).
2.  Import the `Icon` wrapper and types.
3.  Export your component using the pattern below:

```tsx
import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function MyNewIcon(props: IconProps) {
  return (
    <Icon {...props}>
      {/* Paste your SVG path(s) here. Do not include the <svg> tag. */}
      {/* Ensure your paths use 'currentColor' for stroke if you want them to respect the color prop. */}
      <path d="..." />
    </Icon>
  );
}
```

4.  Export the component from `index.ts`.
