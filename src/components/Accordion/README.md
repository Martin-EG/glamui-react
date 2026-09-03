# Accordion

A list of question-and-answer items that expand and collapse on click, one open at a time by default. Reach for it whenever content needs to stay collapsed until a user asks for it — an FAQ list is the motivating case, but any progressive-disclosure list of short questions/labels and longer answers fits.

## Usage

```tsx
import Accordion from '../Accordion';

const faqItems = [
  {
    id: 'privacy',
    question: 'Is my collection data private?',
    answer: 'Yes. Your collection is visible only to you unless you choose to share it.',
  },
  {
    id: 'export',
    question: 'Can I export my data?',
    answer: 'Yes — you can export your full collection at any time.',
  },
];

const MyComponent = () => <Accordion items={faqItems} />;
```

You can see live demos (default, one expanded by default, `allowMultiple`) in Storybook.

## Props

| Prop                 | Type                                          | Default | Required | Description |
| :------------------- | :--------------------------------------------- | :------ | :------: | :----------- |
| `items`               | `AccordionItem[]`                              | -       |   Yes    | Each item's `id` (unique, stable), `question` (`ReactNode` trigger content — must resolve to text as the button's accessible name, and must not itself contain interactive elements), and `answer` (`ReactNode` revealed content). |
| `allowMultiple`       | `boolean`                                      | `false` |    No    | Allow more than one item expanded at once. Defaults to single-open — the common FAQ pattern. |
| `defaultExpandedIds`  | `string[]`                                     | `[]`    |    No    | Item IDs expanded on first render. Defaults to none — an FAQ answers a question the reader already has, it doesn't pre-commit them to reading everything. |
| `onItemToggle`        | `(id: string, isExpanded: boolean) => void`    | -       |    No    | Fires on every expand/collapse. This is the hook a consumer wires analytics through (e.g. a `faq_expand` event) — `Accordion` itself knows nothing about analytics. |

## Accessibility Notes

- Each trigger is a real `<button>` wrapped in an `<h3>` — the WAI-ARIA Authoring Practices' recommended accordion header pattern. `Accordion` always uses `h3`; it's built for the case where it sits under a section's own `h2` (the FAQ section's `SectionHeading` in `apps/landing`, for instance). If a future usage needs a different heading depth, that's a real gap to add a `headingLevel` prop for then — not added speculatively now.
- Keyboard: `Enter`/`Space` toggle (native `<button>` behavior, no extra handling needed). `ArrowDown`/`ArrowUp` move focus between triggers, wrapping at the ends; `Home`/`End` jump to the first/last trigger — the Authoring Practices' recommended keyboard model for accordions, not just "Tab between buttons."
- Each trigger carries `aria-expanded` and `aria-controls` pointing at its panel's `id`; each panel carries `aria-labelledby` pointing back at its trigger's `id`, plus `role="region"`.
- Collapsed panels are `aria-hidden="true"` **and** `inert` — not just visually collapsed. `answer` accepts `ReactNode`, so a collapsed panel's content can contain focusable elements (a link, in the `RichContent` story); `aria-hidden` alone would have hidden them from the accessibility tree while leaving them reachable by Tab, exactly the risk the original (string-only) version of this component flagged as unsolved. `inert` (native, no JS focus-trapping) closes it: a collapsed panel's descendants are untabbable and unclickable, and both are restored the moment the panel expands.
- `question` renders inside the trigger `<button>`, so its accessible name is computed from its content (accessible-name-from-content) — inline formatting (`<strong>`, an icon) works the same way it would in any button's children. `question` must not contain an interactive element (a nested `<a>`/`<button>`): that would be invalid HTML (interactive content inside interactive content) and isn't prevented by the type system — keep `question` to non-interactive, text-equivalent content.

## Migration Notes

`question` and `answer` widened from `string` to `ReactNode` (a superset — every existing string-based usage keeps working unchanged). The answer wrapper switched from `<Text as="p">` to `<Text as="div">` so block-level `ReactNode` content (a list, a nested paragraph) doesn't land inside an invalid `<p>`; this doesn't change rendered text styling. See the `RichContent` story for the motivating shapes (inline formatting in `question`, a link and a list in `answer`).

## Foundation notes

Reused `focus.ring.width` + `colors.brand.primaryAlpha` for the trigger's focus-visible glow — the exact pattern documented in the Foundation System and already used by `TextInput`/`TextArea`/`Select`/`DateInput` (see `CHANGELOG.md`, "Fixed — `focus.shadow` was more broken than 'not theme-aware'"). No new token was needed; this is one more real consumer of that existing pattern, not a gap.

The one genuine addition: `Icons.Chevron` (`packages/ui/src/components/Icon/Chevron.tsx`) — no expand/collapse indicator existed anywhere in the icon set. Added following the exact pattern every other icon file already uses (a single `<path>` in the shared 24×24 viewBox), not a one-off inline SVG scoped to `Accordion` alone, since a chevron is a generic enough shape that a future disclosure-style component shouldn't have to re-add it.

## Design Brief

**Purpose.** Progressive disclosure for a list of short question/answer (or label/content) pairs — expand one to read it, without the rest of the list disappearing or navigating away.

**Problem solved.** Before this component, GlamVault had no way to build an FAQ (or any collapsible list) without either showing every answer at once (overwhelming, especially past 4-5 questions) or hand-rolling expand/collapse state and ARIA wiring per usage — exactly the kind of repeated, easy-to-get-subtly-wrong accessibility work a shared component exists to prevent.

**Capabilities unlocked.** The landing page's FAQ section (Landing Page Execution Plan §3, §8: named as the one confirmed genuine component gap in the entire landing page — no existing GlamUI component provides expand/collapse semantics; `Menu`'s interaction model, a transient dropdown, is a different pattern, not a fit). Any future in-app collapsible list (e.g. a settings screen's grouped, disclosable sections) is also unlocked, though none is named yet.

**Design principles.** Embodies the Constitution's "composition over configuration" (built from `Text` + `Icons.Chevron`, not a monolith reimplementing typography or iconography) and "the accessible path and the easy path must be the same path" (a consumer gets full ARIA wiring and keyboard navigation for free — there's no less-accessible shortcut available even if they wanted one). Considered and rejected: a compound-component API (`<Accordion.Item><Accordion.Trigger/><Accordion.Panel/></Accordion.Item>`) in favor of a flat `items` prop, matching `Menu`'s existing precedent of prop-driven data over children composition — a smaller API surface for the one shape every named use case actually needs.

**Accessibility.** A keyboard-only user can reach every trigger via Tab (or arrow keys once inside the accordion), toggle with Enter/Space, and jump to the first/last item with Home/End. A screen-reader user hears each trigger's expanded/collapsed state (`aria-expanded`) and, once expanded, the answer content is announced as a labeled region; collapsed answers are fully removed from the accessibility tree, not just visually hidden.

**Interaction model.** Click (or Enter/Space) a question to expand its answer; click again to collapse. By default, expanding one question collapses whichever was previously open (`allowMultiple` opts into independent items).

**Motion.** Yes — a smooth height transition on expand/collapse (`Panel`'s `grid-template-rows: 0fr → 1fr` technique) and a rotating chevron, both reading `theme.motion.duration.moderate`/`base` through the existing `--motion-duration-*` CSS custom properties `GlobalStyles` already zeroes under `prefers-reduced-motion` — no new reduced-motion handling needed, this is a real consumer of the existing mechanism.

**States.** Collapsed (default), expanded, trigger hover, trigger focus-visible.

**Variants.** Single-open (default) vs. `allowMultiple`.

**Tokens used.** `spacing` (`md`), `colors.border.default`, `colors.brand.primary`/`primaryAlpha`, `colors.text.muted`/`secondary`, `size.minTouchTarget`, `radius.sm`, `focus.ring.width`, `motion.duration.base`/`moderate`, `motion.easing.standard` — all pre-existing; see Foundation Notes above for the one real addition (`Icons.Chevron`, not a token).

**Dependencies.** `Text` (trigger and answer typography), `Icons.Chevron` (new, see Foundation Notes).

**Future evolution.** A `headingLevel` prop, if a second real usage needs a heading depth other than `h3`. Not built now against a hypothetical need. (Rich/interactive `answer` content — previously listed here as a deferred future need — has since been built: `question`/`answer` accept `ReactNode`, and the `aria-hidden`-on-collapse question this note flagged was resolved with `inert`; see Accessibility Notes and Migration Notes.)

**Success criteria.** A consumer can build a complete, accessible FAQ from this component's props alone, with zero custom ARIA wiring or keyboard handling — the landing page's FAQ section (built immediately after this component) is the concrete proof.

**Non-goals.** Not a general-purpose collapsible/`<details>` replacement for a single item (that's simpler than this component's multi-item coordination and keyboard model warrants). Not a nested/tree accordion. Not a tab panel (a different, non-stacking interaction model `SegmentedControl` is closer to).
