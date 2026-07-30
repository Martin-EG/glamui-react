# The GlamUI Foundation System

### What exists today, and why it's built this way

This document describes the token and theme system as it is actually implemented in `packages/ui/src/tokens` and `packages/ui/src/styles` right now. It does not describe a target architecture or a future state — where something hasn't been built yet (a second theme, a component-token layer), this document says so plainly, and confines any forward-looking guidance to the "Future Extension Guidelines" section at the end, clearly marked as guidance rather than fact.

It's written for three readers at once: a designer deciding what a new value should be called, an engineer deciding where a value should live, and an AI coding assistant deciding which existing token to reach for before writing a new one. All three should be able to answer their question from this document without opening a single source file.

---

## 1. Token Hierarchy

The system has two layers today.

### Layer 0 — Primitives (`tokens/colors.palette.ts`)

Raw color values with no meaning attached: hue ramps (`pink`, `gray`, `red`, `green`, `amber`, `blue`) plus a single `white`. This is the only file allowed to contain a literal hex value. Nothing outside `tokens/colors.ts` imports from it.

### Layer 1 — Semantic tokens (everything else in `tokens/`)

Meaning-bearing names that either reference a primitive (color) or stand on their own (spacing, motion, sizing — categories with no separate "raw" layer because a raw `12px` and a semantic `spacing.md` would just be the same file twice). This is the layer every component reads from, always through the assembled theme object, never by importing a token file directly.

| File | Exports | What it governs |
|---|---|---|
| `colors.ts` | `colors` | Color, grouped by role: `brand`, `text`, `border`, `background`, `surface`, `feedback` |
| `spacing.ts` | `spacing` | Layout spacing: `xs` `sm` `md` `lg` `xl` |
| `typography.ts` | `typography` | `sizes`, `lineHeights`, `weights` |
| `radius.ts` | `radius` | Corner radii: `sm` `md` `lg` `xl` |
| `shadows.ts` | `shadows` | Elevation: `sm` `md` `lg` |
| `motion.ts` | `motion` | `duration.*` and `easing.*` |
| `opacity.ts` | `opacity` | Named opacity states: `disabled`, `disabledButton`, `caption`, `decorative`, `disabledDay` |
| `zIndex.ts` | `zIndex` | Stacking order: `dropdown`, `modal`, `popover` |
| `focus.ts` | `focus` | `ring.width`, `ring.offset`, `shadow` |
| `size.ts` | `size` | Recurring pixel sizes: `field`, `calendarDay`, `iconSlot`, `minTouchTarget` |
| `../styles/breakpoints.ts` | `breakpoints` | `xs` `sm` `md` `lg` `xl` |

**There is no component-token layer yet.** A component that needs a specific value — Avatar's placeholder icon size, Menu's minimum hit target — reads a semantic token directly (`theme.size.iconSlot`, `theme.size.minTouchTarget`). Two components that happen to need the same value share the same semantic token; nothing routes through a per-component indirection like `avatar.size.placeholder`. This keeps the system small while the semantic layer is still filling in — see §7 for why, and §9 for what changes if this stops being sufficient.

**Why two layers and not more:** every additional layer is something a reader has to hold in their head before they can find a value. Two layers is the minimum that separates "what a color physically is" from "what it means" — collapsing them would mean renaming a hex value every time its meaning needs to change color, which is precisely the problem semantic tokens exist to prevent. A third layer is only worth its cost once component-specific reuse actually demands it (§9), not before.

---

## 2. Naming Conventions

**Primitive keys** are `<hue>.<step>`, numeric and monotonic — as the number rises, the color darkens. `pink[500]`, `gray[900]`. (One exception exists today: `pink.Alpha25`, a non-numeric key for a pre-mixed alpha value. It predates this documentation and is not the pattern to copy — see §8.)

**Semantic keys** are `<category>.<role>.<state?>`, read as a plain-English sentence: `colors.text.primary` is "the primary text color," `colors.feedback.errorText` is "the text color for an error." Where a category isn't color, the same shape holds: `motion.duration.fast`, `size.iconSlot`, `zIndex.modal`.

**Boolean-shaped states** (disabled, danger, hover) appear as a leaf key, not a prefix or suffix pattern — `opacity.disabled`, not `opacity.opacityDisabled` or `disabledOpacity`. This keeps every token's own name out of its own value.

**File naming** matches the exported constant name exactly (`motion.ts` exports `motion`, `zIndex.ts` exports `zIndex`), so a reader can always guess the import path from the token name alone, and vice versa.

**One inconsistency worth naming honestly:** the five newest token files (`motion`, `opacity`, `zIndex`, `focus`, `size`) are declared `as const` for literal types; the original five (`colors`, `spacing`, `typography`, `radius`, `shadows`) are not. This wasn't retrofitted onto the older files to avoid an unrelated, wide-blast-radius type change alongside this work. Treat `as const` as the standard for anything new.

---

## 3. Theme Architecture

```
packages/ui/src/styles/
  breakpoints.ts       — standalone export, also folded into the theme
  theme.ts             — backward-compatible re-export of themes.light
  themes/
    light.ts           — the only theme that exists today
    index.ts           — the theme registry: { light }, and `ThemeName`
```

A **theme** is a single object assembling every semantic token plus one value that isn't a token (`fonts.primary`, a CSS custom property reference — see §7 for why it's the one exception). `themes/light.ts` is that assembly today:

```ts
export const lightTheme = {
  fonts: { primary: 'var(--font-nunito), system-ui, sans-serif' },
  colors, spacing, typography, radius, shadows,
  breakpoints, motion, opacity, zIndex, focus, size,
};
```

`themes/index.ts` exports a registry, `themes = { light: lightTheme }`, and a `ThemeName` type derived from its keys. **Only `light` exists.** There is no `dark` entry, no dark values anywhere in the token files, and no runtime theme-switching mechanism. Any documentation, code, or comment implying otherwise is wrong until a `themes/dark.ts` actually exists.

`styles/theme.ts` re-exports `themes.light` as `theme`, for the code that imported it before the registry existed. New code should prefer `themes.light` (or, once it exists, whichever entry applies) over the flat `theme` export.

**How a component gets the theme:** `apps/web/src/providers/ThemeProvider.tsx` wraps the app in styled-components' `ThemeProvider` with `theme` from `@glamui/react`. A `styled-components.d.ts` module augmentation (present in both `packages/ui` and `apps/web`) declares `DefaultTheme extends AppTheme`, so every styled component's `props.theme` and every call to `useTheme()` is fully typed against the real theme shape — not `any`.

A styled component reads the theme through its template function:

```ts
// packages/ui/src/components/Avatar/Avatar.styles.ts
transition:
  border-color ${({ theme }) => theme.motion.duration.base}
    ${({ theme }) => theme.motion.easing.standard};
```

A plain function component that isn't a styled component reads it through the hook:

```tsx
// apps/web/src/features/BottomNavigation/BottomNavItem.tsx
const theme = useTheme();
const color = !isActive ? theme.colors.text.muted : undefined;
```

Both are first-class, both are typed, and both are the only two supported ways to read a token.

---

## 4. Ownership

There is no formal per-token ownership metadata (no owner field, no CODEOWNERS mapping) as of this document. What exists instead is a structural rule, enforced two different ways:

- **Import direction is enforced by code review and by what actually gets imported**, not by a lint rule inside `packages/ui` itself. Every current `.styles.ts` file reads exclusively through `props.theme`; none imports a token file directly. This is a fact about the current codebase, not a guaranteed invariant — nothing currently stops a future component from importing `../../tokens/colors` directly, so it stays true only because contributors keep it true.

- **Consumer code in `apps/web` is lint-enforced**, but only in two directories. `apps/web/eslint.config.mjs` restricts `@glamui/react/tokens` imports for files under `src/app/**` and `src/features/**`:

  ```
  group: ['@glamui/react/tokens'],
  message: 'Do not import design tokens directly. Read design
  decisions through the theme instead: props.theme in
  styled-components, or the useTheme() hook in function components.'
  ```

  This rule does not cover `apps/landing`, and does not cover `packages/ui` itself. The package's `./tokens` subpath export (`@glamui/react/tokens`) still exists publicly — it isn't blocked at the package level, only discouraged at the one call site it was actually being used incorrectly.

**Why this shape and not central ownership:** the token set is still small enough — five original files, five new ones — that one team (or one person) reviewing every PR that touches `tokens/` or `styles/themes/` is a real, working process, not a bottleneck. A formal ownership file becomes worth adding once the component count or contributor count makes informal review insufficient; adding one before that point would be governance for a problem that doesn't exist yet.

---

## 5. Migration Rules

The rule actually followed so far, demonstrated by the tokens currently marked this way in `colors.ts`, `shadows.ts`, and `typography.ts`:

1. **Deprecate in a comment before removing.** A token found to have zero real consumers is marked with a `/** @deprecated ... */` JSDoc comment directly above its declaration, stating why (usually: unused, or superseded by a named replacement) — it is not deleted, and it keeps working for anyone still reading it.

   ```ts
   // tokens/colors.ts
   background: {
     /** @deprecated Unused. Use `colors.feedback.errorBg` instead. */
     danger: palette.red[100],
     ...
   }
   ```

2. **Point at the replacement when one exists.** `colors.text.success/warning/info` and `colors.background.danger/success/warning/info` are deprecated in favor of the equivalent `colors.feedback.*` entries, which are the ones components actually use. Where no replacement exists (`shadows.sm`, `shadows.lg`, `typography.lineHeights.relaxed`, `colors.surface.subtle`, `colors.surface.elevated`, `colors.brand.primaryAlpha`, `colors.border.danger`), the comment says so instead of inventing one.

3. **Nothing is deleted as part of marking it deprecated.** Removal is a separate, later decision, made once real usage (not memory) confirms zero remaining consumers across the monorepo.

4. **A value that changes visually is not the same change as a value that gets renamed.** Every deprecation made so far preserves the exact rendered output; a genuine visual change to a deprecated value's replacement is a distinct, separately-reviewed decision.

**Why deprecate-in-place instead of deleting immediately:** a token export is public API of `@glamui/react`. Deleting one is a breaking change for any consumer — inside this monorepo or outside it — that the deprecating change's author cannot fully enumerate. A comment costs nothing and gives every consumer a compiler-visible (via editor tooltips) warning before anything actually breaks.

---

## 6. Examples

**Reading a color role correctly** (the fix this system's own history demonstrates): several form fields once set their background from `colors.text.inverse` — a text color, reused because it happened to be white. It was corrected to `colors.surface.default`, the actual "default surface" role, which is also white — so nothing rendered differently, but the token now says what it means:

```ts
// packages/ui/src/components/TextInput/TextInput.styles.ts
background: ${({ theme }) => theme.colors.surface.default};   // not colors.text.inverse
```

**Adding a focus state**, using the one system-wide focus treatment rather than a hand-typed outline:

```ts
&:focus-visible {
  outline: ${({ theme }) => theme.focus.ring.width} solid
    ${({ theme }) => theme.colors.brand.primary};
  outline-offset: ${({ theme }) => theme.focus.ring.offset};
}
```

**Reading the theme outside styled-components:**

```tsx
import { useTheme } from 'styled-components';

const theme = useTheme();
// theme.zIndex.modal, theme.colors.text.muted, etc. — fully typed
```

**What NOT to do** — importing a token module directly in consumer code:

```ts
// ❌ blocked by lint in apps/web/src/app/** and src/features/**
import { colors } from '@glamui/react/tokens';
```

---

## 7. Decision Rationale

A few decisions in this system aren't self-explanatory from the code, so they're recorded here rather than left to be reverse-engineered later.

- **`fonts.primary` lives in the theme but isn't a token file.** It's a single CSS custom property reference (`var(--font-nunito), ...`), not a set of named values with more than one member — there was nothing to make a category out of yet. If a second font role is ever needed, that's the point at which a `typography.fonts` token category should be created; one value doesn't justify one today.

- **`zIndex.dropdown` and `zIndex.modal` are both `1000`.** This was not resolved to two different numbers during migration, because the components using them (`Menu`, `Modal`, `LoadingOverlay`) don't currently render on screen simultaneously in a way where their relative order matters. The values were preserved exactly as found, not redesigned, so that documenting them wouldn't itself introduce a stacking regression. If a future component needs a dropdown to render above a modal (or vice versa), that's a real product requirement that should drive giving them distinct values — not a documentation exercise.

- **`size` is a flat set of named values, not a graduated scale.** `field` (35px), `calendarDay` (28px), `iconSlot` (32px), and `minTouchTarget` (44px) don't form a `sm/md/lg` progression because the four real values found in the codebase didn't form one either — they're four unrelated, independently-arrived-at sizes that happened to each repeat more than once. Forcing them into a scale would imply a relationship between them that isn't true. A scale is worth building once enough sizes exist that a genuine progression, not just a coincidence of counting, is visible in them.

- **`opacity` is named states, not a 0–1 scale.** Same reasoning: `0.6`, `0.5`, `0.75`, `0.7`, and `0.45` are five specific, independently-chosen decisions (a disabled form field looks different from a disabled button on purpose), not five points on one ramp.

---

## 8. Common Mistakes

| Mistake | Why it's wrong | What to do instead |
|---|---|---|
| Using a `text.*` color for a background (or any role for another role) because the resulting hex happens to match | It's a coincidence, not a guarantee — the two roles are free to diverge in value later, and then the visual bug is silent | Use the token whose *name* matches what you're doing, not the one whose current *value* matches |
| Importing `@glamui/react/tokens` (or a file under `tokens/`) directly in a component | Bypasses the theme, meaning the value can't be swapped by a future theme change, and (in `apps/web/src/app` or `src/features`) it's a lint error | Read through `props.theme` or `useTheme()` |
| Typing a new raw duration, opacity decimal, z-index number, or pixel size instead of checking `motion` / `opacity` / `zIndex` / `size` first | This is exactly the pattern that produced a dozen-plus hand-typed durations before this system existed | Check the relevant token file first; if genuinely nothing fits, that's a signal a new named token may be needed — not a reason to hardcode |
| Copying the `pink.Alpha25`-style non-numeric palette key as a pattern for a new primitive | It's a pre-existing exception, not the convention — palettes should stay `<hue>.<numeric step>` | Compute an alpha value where it's used, or add a proper semantic token, rather than adding another special palette key |
| Assuming `theme` (the singular export from `styles/theme.ts`) reflects whichever theme is active | It's a light-only backward-compat alias, marked `@deprecated` — it never resolves to dark, regardless of app state | Use `themes.light` / `themes.dark` (or `themes[name]`) from `styles/themes`, which is what `theme` is a fixed alias for |
| Reaching for a shadow-based `focus.shadow` token for text-like fields | It doesn't exist — it was removed for failing WCAG 2.4.7 contrast in the light theme. Every focus treatment in this system is now the same ring | Compose `box-shadow: 0 0 0 ${theme.focus.ring.width} ${theme.colors.brand.primaryAlpha}` directly, as Button/SegmentedControl/DateInput/Tooltip already do |

---

## 9. Future Extension Guidelines

This section is guidance for work that hasn't happened yet — read it as instructions, not as a description of the current system.

- **Adding a second theme** means adding `styles/themes/dark.ts`, exporting an object of the same shape as `lightTheme` (a `type ThemeTokens = typeof lightTheme` guard makes the compiler enforce this), then adding it to the `themes` registry in `styles/themes/index.ts`. No component should need to change — every component already reads through `props.theme`/`useTheme()`, so a new theme takes effect the moment the app selects it.

- **Adding a component-token layer** (the one layer this system doesn't have yet) should happen per-component, not all at once: a `<Component>.tokens.ts` file colocated with the component, containing only references to existing semantic tokens — never a new raw value. The right time to add one for a specific component is when that component's own values are duplicated across more than one file for it (the way `Avatar` and `AvatarSkeleton` currently repeat the same `SIZE_MAP` by hand) — that duplication is the evidence a component-token file would resolve.

- **Adding a new semantic category** (beyond the ten that exist) should follow the same threshold used to justify the five added in this round: at least two real, independent, hardcoded duplicates of the same kind of value found in the actual codebase — not a value added speculatively because a category "feels missing."

- **Extending the `no-restricted-imports` boundary** beyond `apps/web/src/app` and `src/features` (to `apps/landing`, or to enforce it inside `packages/ui` itself) is a reasonable next step once either surface actually needs it — it wasn't done preemptively everywhere because the specific violation this round fixed only existed in one place.

- **Removing a deprecated token** should only happen after confirming zero remaining consumers across every package and app in the monorepo (checked directly, not from memory), and should ship as its own change, separate from any deprecation or feature work, so a removal is always reviewable in isolation.
