# EmptyState

The zero-content state for any list, grid, or search result — nothing in a collection yet, no matches for a filter, or a failed load. One component, three copy variants driven entirely by props — see [Design Brief](#design-brief) for why this isn't three separate components.

## Usage

```tsx
import EmptyState from '../EmptyState';
import Button from '../Button';
import { Box } from '../Icon';

const MyComponent = () => (
  <EmptyState
    icon={<Box size="xl" />}
    title="Your collection is empty"
    description="Scan or add your first product to start tracking it."
    action={<Button variant="primary">Add a product</Button>}
  />
);
```

You can see live demos — first-run, no-search-results, and error-caused-empty — in Storybook.

## Props

| Prop          | Type        | Default | Required | Description |
| :------------ | :---------- | :------ | :------: | :----------- |
| `title`       | `string`    | -       |   Yes    | What's empty and why, in a few words. The only required content. |
| `icon`        | `ReactNode` | -       |    No    | Decorative illustration or icon. Rendered `aria-hidden` — pass any GlamUI icon at whatever `size` fits, or a custom SVG. |
| `description` | `string`    | -       |    No    | Optional elaboration — what to do about it, or why it's empty. |
| `action`      | `ReactNode` | -       |    No    | A single action, usually a `Button`. Rendered as-is, not wrapped in another interactive element. |

## Accessibility Notes

- The icon is always `aria-hidden` — it's decorative, and the title already carries the meaning. A screen reader user loses nothing by it being invisible to them.
- The title is rendered as a styled paragraph (`Text as="p" weight="semibold"`), not a heading (`h1`–`h4`). `EmptyState` is a reusable primitive dropped into arbitrary places in a page — asserting a specific heading level could skip or duplicate levels in whatever document outline it's placed into. If a specific usage needs `EmptyState`'s title to be a real heading for that page's outline, wrap it or extend at the call site rather than GlamUI guessing the right level generically.
- The component renders no live region. It's meant to be present in the DOM from first render (e.g. a list that resolves to zero items), not injected as a dynamic status update after the fact — if a future usage needs to announce a transition into an empty state, that's the call site's responsibility (e.g. wrapping it in its own `aria-live` region), not a default this component should force onto every usage.

## Design Brief

**Purpose.** Give every list-based screen in GlamVault (Inventory, Wishlist, Search, Collections) one consistent way to represent "there's nothing to show," instead of each screen inventing its own.

**Problem solved.** Before this component, "empty" meant an actually-blank screen, or copy hand-rolled per screen with no shared visual language.

**Capabilities unlocked.** Inventory, Wishlist, Search, Collections — every list capability in the Product Capability Map that can legitimately be empty.

**Design principles.** Tokens as the only source of visual values (verified — no hardcoded values in `EmptyState.styles.ts`); small API over configuration sprawl (four props, one of them required); composition over ownership (delegates typography to `Text`, actions to whatever the consumer passes, rather than reimplementing either).

**Interaction model.** Not interactive itself — a static region. Its optional `action` is the only interactive surface, and it's the consumer's own component (typically `Button`), not something `EmptyState` renders or wires up.

**Motion.** None. The Product Capability Map explicitly called this out as not needing motion, and no token or transition was added — a deliberate absence, not an oversight.

**States.** One visual state — there's no loading/hover/disabled state, since the component itself isn't interactive.

**Variants.** No variant prop. First-run, no-results, and error-caused-empty (the three copy patterns named in the capability map) are all the same component with different `title`/`description`/`action` — a variant enum would have encoded content decisions into the API instead of leaving them to the caller.

**Tokens used.** `spacing` (`xs`, `sm`, `md`, `xl`), `colors.text.muted` — both pre-existing, no gap found or token added.

**Dependencies.** `Text` (title and description), and whatever the consumer passes as `icon`/`action` (typically a GlamUI `Icon` and `Button`).

**Future evolution.** If a second consumer needs the empty state to announce itself on a live transition (e.g. real-time sync clearing a list), that behavior should be added as an opt-in prop then — not assumed now for a need that doesn't exist yet.

**Success criteria.** A consumer can build all three copy variants from the capability map using only this component's props, with zero custom styling.

**Non-goals.** Not a loading state (`LoadingAnimation`/`LoadingOverlay`/`CardSkeleton` already cover that). Not a full-page error boundary. Not responsible for deciding *when* a list is empty — only for representing it once the caller has decided.
