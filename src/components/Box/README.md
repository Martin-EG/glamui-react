# Box

A generic bordered/padded/rounded/surfaced container, built from theme tokens. Reach for it instead of a one-off `styled.div` when you need a themed box and don't need `Card`'s title/image/footer/menu semantics.

## Usage

```tsx
import Box from '../Box';

const MyComponent = () => (
  <Box padding="md" radius="md" border background="default">
    content
  </Box>
);
```

You can see live demos (padding, radius, background, border, `as`) in Storybook.

## Props

All standard HTML attributes are also supported (e.g. `className`, `id`, `data-*`).

| Prop         | Type                                             | Default   | Required | Description |
| :----------- | :------------------------------------------------ | :-------- | :------: | :----------- |
| `as`         | `'div' \| 'section' \| 'article'`                 | `'div'`   |    No    | The HTML element to render. |
| `padding`    | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`            | -         |    No    | Padding, read from `theme.spacing`. Omit for no padding. |
| `radius`     | `'sm' \| 'md' \| 'lg' \| 'xl'`                    | -         |    No    | Border radius, read from `theme.radius`. Omit for no radius. |
| `background` | `'default' \| 'subtle' \| 'muted' \| 'elevated'`  | -         |    No    | Background, read from `theme.colors.surface`. Omit for a transparent background. |
| `border`     | `boolean`                                         | `false`   |    No    | A 1px border using `theme.colors.border.default`. |
| `children`   | `ReactNode`                                       | -         |    No    | Box content. |

## Design Brief

**Purpose.** A generic bordered/padded/rounded/surfaced container — the primitive `Card`, `MessageBar`, and `Modal` already hand-build internally, made reusable.

**Problem solved.** Before this component, every consumer needing a themed box (border, radius, padding, surface color) re-derived the same handful of CSS declarations against `theme.spacing`/`theme.radius`/`theme.colors` inline, with no shared building block and no consistency between usages — visible across GlamVault's own screens and inside GlamUI's reference site, where the same shape (`Card`, `CardBody`, `Swatch`) was hand-rolled three separate times on one page alone.

**Capabilities unlocked.** A consistent, token-driven container primitive for any screen composing custom layout — the tier directly below components like `Card` in the Component Evolution Program's Capabilities → Patterns → Primitives → Components ordering.

**Design principles.** "No visual opinion until asked" (every prop is optional and unstyled by default, matching `Clickable`'s precedent — a bare `<Box>` renders as a plain, invisible `<div>`). "Composition over configuration" — `Card` and similar opinionated components are expected to compose `Box` in a future pass rather than `Box` growing image/title/footer props of its own.

**Accessibility.** None required — a purely visual container with no interactive semantics. Renders as a plain `<div>`/`<section>`/`<article>` via `as`, so a consumer can pick the semantically correct element for its context.

**Interaction model.** None — `Box` is not interactive. Use `Clickable` when a box-shaped area needs to respond to clicks/keyboard.

**Motion.** None needed.

**States.** None — `Box`'s appearance is fully determined by its props, not runtime state.

**Variants.** Independent, composable props (`padding`, `radius`, `background`, `border`, `as`) rather than a fixed variant enum — the shapes needed (a bordered card-like box, a padded-only wrapper, a subtly-tinted panel) don't share a small enough set of names to be one `variant` prop.

**Tokens used.** `theme.spacing`, `theme.radius`, `theme.colors.surface`, `theme.colors.border.default` — all pre-existing, no gap found.

**Dependencies.** None.

**Future evolution.** A `shadow` prop reading `theme.shadows`, if a real elevated-surface use case appears. Not added speculatively now.

**Success criteria.** `Card`'s internal `StyledCard`/`CardBody`, and the reference site's `Tokens.tsx`/`ClickablePage.tsx` bespoke boxes, could each be rewritten as `<Box>` with no visual change.

**Non-goals.** Not a replacement for `Card` (title/image/footer/menu semantics stay there). No shadow/elevation prop yet. Not a flex container — see `Stack` for that.
