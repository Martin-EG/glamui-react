# Avatar Component

The `Avatar` component is used to display user profile images. It supports different sizes, a loading state, and an editable mode.

## Usage

```tsx
import { Avatar } from '../Avatar';

const MyComponent = () => {
  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      {/* Default Avatar */}
      <Avatar src="/path/to/image.jpg" alt="User Profile" />

      {/* Avatar with specific size */}
      <Avatar src="/path/to/image.jpg" size="lg" />

      {/* Avatar with placeholder (no src) */}
      <Avatar />
    </div>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop       | Type         | Default     | Required | Description                                                                      |
| ---------- | ------------ | ----------- | :------: | -------------------------------------------------------------------------------- |
| `src`      | `string`     | `undefined` |    No    | The source URL of the image. If not provided, a placeholder will be shown.       |
| `alt`      | `string`     | `'Avatar'`  |    No    | The alternative text for the image.                                              |
| `size`     | `AvatarSize` | `'md'`      |    No    | The size of the avatar. Options: `'sm'`, `'md'`, `'lg'`.                         |
| `editable` | `boolean`    | `false`     |    No    | If `true`, the avatar becomes interactive.                                       |
| `loading`  | `boolean`    | `false`     |    No    | If `true`, displays a loading skeleton.                                          |
| `onClick`  | `() => void` | `undefined` |    No    | Callback function when the avatar is clicked (requires `editable` to be `true`). |

## Features

### Loading State

You can show a skeleton loader by setting the `loading` prop to `true`.

```tsx
<Avatar loading size="lg" />
```

### Editable

To make the avatar clickable (e.g., to upload a new photo), set `editable` to `true` and provide an `onClick` handler.

```tsx
<Avatar
  src="/path/to/image.jpg"
  editable
  onClick={() => console.log('Edit avatar clicked')}
/>
```

## Styles

The component uses styled-components.

- `AvatarRoot`: The container element.
- `AvatarImage`: The image element.
- `AvatarPlaceholder`: The fallback icon when no image is provided.
