# Stack

A flex layout primitive — direction, gap, alignment — for composing components in a row or column without a bespoke `styled.div`.

## Usage

```tsx
import Stack from '../Stack';

const MyComponent = () => (
  <Stack direction="row" gap="md" align="center">
    <Avatar src="/dog.jpg" alt="User" />
    <TextInput label="Display name" />
  </Stack>
);
```

You can see live demos (direction, gap, align, justify, wrap, `as`) in Storybook.

## Props

All standard HTML attributes are also supported (e.g. `className`, `id`, `style`, `data-*`).

| Prop        | Type                                                    | Default    | Required | Description |
| :---------- | :------------------------------------------------------- | :--------- | :------: | :----------- |
| `as`        | `'div' \| 'form' \| 'section'`                           | `'div'`    |    No    | The HTML element to render. |
| `direction` | `'row' \| 'column'`                                      | `'column'` |    No    | Flex direction. |
| `gap`       | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'`                   | `'md'`     |    No    | Gap between children, read from `theme.spacing`. |
| `align`     | `'start' \| 'center' \| 'end' \| 'stretch' \| 'baseline'`| `'stretch'`|    No    | Cross-axis alignment (`align-items`). |
| `justify`   | `'start' \| 'center' \| 'end' \| 'between'`              | `'start'`  |    No    | Main-axis alignment (`justify-content`). |
| `wrap`      | `boolean`                                                | `false`    |    No    | Whether children may wrap onto new lines. |
| `children`  | `ReactNode`                                              | -          |    No    | Stack content. |

## Design Brief

**Purpose.** A flex layout primitive for composing components in a row or column, with a shared gap/alignment API.

**Problem solved.** Before this component, every multi-child layout (a login form's fields, a profile row's avatar + input, a grid of icon tiles) hand-wrote its own `display: flex; flex-direction; gap; align-items` inline — three separate instances found on a single reference-site page alone, each duplicating the same handful of CSS declarations against `theme.spacing`.

**Capabilities unlocked.** A consistent, token-driven flex-layout primitive for any screen composing components together — the tier directly below full components in the Component Evolution Program's Capabilities → Patterns → Primitives → Components ordering. Pairs with `Box` (bordered/padded containers) to cover the two layout shapes that were being hand-rolled everywhere.

**Design principles.** "No visual opinion until asked" — sensible flex-layout defaults (`column`, `theme.spacing.md` gap, `stretch` alignment) rather than an unstyled no-op, since a `Stack` with no layout behavior at all wouldn't be a stack. "Small APIs" — five layout props, each mapping directly to one CSS flex property, no shorthand or responsive system layered on speculatively.

**Accessibility.** None required — a purely visual layout container with no interactive semantics. Renders as `div`/`form`/`section` via `as`, so a consumer can pick the semantically correct element (e.g. `as="form"` for a login form's field stack).

**Interaction model.** None — `Stack` itself has no interaction; it only lays out its children.

**Motion.** None needed.

**States.** None — `Stack`'s layout is fully determined by its props.

**Variants.** Independent, composable props (`direction`, `gap`, `align`, `justify`, `wrap`) rather than a fixed variant enum, so any combination (e.g. a wrapping row of tags, a centered column of fields) is directly expressible.

**Tokens used.** `theme.spacing` for `gap`. No gap found in the token system.

**Dependencies.** None.

**Future evolution.** A `Grid` primitive for CSS Grid layouts, if a second real use case appears beyond the reference site's token-swatch grid (currently one occurrence — not enough to justify a new primitive yet, per the Evolution Rules' "a real, named gap — not preference" bar).

**Success criteria.** The reference site's `Form`, `ProfileRow`, and `Tile` styled wrappers, and any GlamVault screen composing a form or a row of components, could each be rewritten as a `<Stack>` with no visual change.

**Non-goals.** Not a grid primitive — see Future evolution. No responsive/breakpoint props — no named use case needs them yet. Not a bordered/padded container — see `Box` for that.
