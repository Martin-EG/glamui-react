# ProgressRing Component

A circular progress indicator — storage quota usage, a completion stat, anything expressed as a percentage of a whole. Switches to the error feedback color at 90%+ to flag near-full states.

## Usage

```tsx
import ProgressRing from '../ProgressRing';

const MyComponent = () => <ProgressRing value={73} size="lg" />;
```

You can see live demos and usage in Storybook.

## Props

| Prop    | Type                  | Default | Required | Description                                                  |
| :------ | :--------------------- | :------ | :------: | :-------------------------------------------------------------- |
| `value` | `number`               | -       |   Yes    | 0–100. Out-of-range values are clamped.                          |
| `size`  | `'sm' \| 'md' \| 'lg'` | `'md'`  |    No    | Diameter.                                                        |
| `label` | `string`               | -       |    No    | Overrides the default `{value}%` center label.                    |

Exposes progress via `role="progressbar"` and `aria-valuenow`/`aria-valuemin`/`aria-valuemax`.

## Foundation notes

Building this surfaced that `Avatar` had a private `SIZE_MAP` (40/72/120px) duplicated by hand between `Avatar.styles.ts` and `AvatarSkeleton.styles.ts` — a duplicate the original design-system audit had already flagged but nothing had closed. `ProgressRing` needed the identical three diameters for its own circular sizing, which is the second-independent-use the extensibility rule asks for before promoting something to a shared token. Both `Avatar`'s local map and this component now read `theme.size.circle` instead.
