# Badge Component

The `Badge` component displays a small count, status, or indicator, typically anchored to another element (an icon, an avatar, a nav item).

## Usage

```tsx
import Badge from '../Badge';

const MyComponent = () => {
  return (
    <>
      <Badge>3</Badge>
      <Badge variant="error" max={99} label="99 plus unread messages">
        150
      </Badge>
      <Badge dot variant="success" label="Online" />
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop       | Type                                                                    | Default     | Required | Description                                                                |
| :--------- | :----------------------------------------------------------------------- | :---------- | :------: | :-------------------------------------------------------------------------- |
| `children` | `ReactNode`                                                              | `undefined` |    No    | The visible content of the badge (a number or short text).                 |
| `variant`  | `'default' \| 'brand' \| 'success' \| 'warning' \| 'error' \| 'info'`    | `'default'` |    No    | The visual style of the badge.                                             |
| `size`     | `'sm' \| 'md'`                                                           | `'md'`      |    No    | The size of the badge.                                                     |
| `dot`      | `boolean`                                                                | `false`     |    No    | Renders a small unlabeled dot instead of `children`.                       |
| `max`      | `number`                                                                 | `undefined` |    No    | When `children` is a number greater than `max`, displays `${max}+`.        |
| `label`    | `string`                                                                 | `undefined` |    No    | Accessible name announced to screen readers instead of the visible content. |

## Accessibility

- **Contrast**: every `variant` reuses the same background/text token pairs already verified at WCAG AA elsewhere in the library (`MessageBar`'s `feedback.*` tokens, `Button`'s `brand.primary` / `text.onBrand` pairing). No badge variant introduces a new, unverified color pairing.
- **Voice announcement**: a Badge is exposed with `role="status"`, so a value change (e.g. an unread count going from `2` to `3`) is announced by screen readers. Raw visible content (like `"99+"`) can be confusing or ambiguous when read aloud — pass `label` to control exactly what's announced instead, e.g. `label="99 plus unread messages"`. When `label` is set, the visible text is hidden from assistive tech (`aria-hidden`) so only the label is read, avoiding duplicate or conflicting announcements.
- **Dot badges**: a `dot` badge carries no visible text, so by default it's treated as purely decorative (`aria-hidden`) — it's expected that the element it's attached to already has an accessible name that covers it. Pass `label` to make the dot itself announce something (e.g. `label="Online"`).
