# Changelog

All notable changes to `@glamui/react` are recorded here.

## How entries are classified

Token and theme changes follow the same semantic-versioning intent as the rest of the package:

- **Patch** — a concrete value changes, but no token name, shape, or reference changes (e.g. a hex adjusted slightly within the same semantic role).
- **Minor** — purely additive: a new token, a new category, a new theme, a new component-token file. Always safe for existing consumers.
- **Major** — a token name is removed, or an existing token's meaning changes incompatibly. This only happens once a deprecation window (see below) has closed.

A token is never deleted the same release it's deprecated. It's marked `@deprecated` in its source with a note explaining why (usually: unused, or superseded by a named replacement), and removed only in a later, separately-reviewed change, once its zero-consumer status is reconfirmed rather than assumed from memory.

## Unreleased

### Added — `Accordion`'s `question`/`answer` accept `ReactNode`

Widens `AccordionItem.question` and `.answer` from `string` to `ReactNode` (a superset — every existing consumer keeps working unchanged). This is the exact expansion `Accordion`'s own README had already flagged and deferred at launch: rich `answer` content re-opens the "collapsed panel `aria-hidden` with focusable descendants" risk the original Accessibility Notes named as unsolved.

- Fixed by marking the collapsed panel both `aria-hidden` **and** `inert` (native, React 19-typed) — any focusable content inside a collapsed `answer` (a link, in the new `RichContent` story) is untabbable and unclickable while collapsed, restored on expand.
- The answer wrapper switched from `<Text as="p">` to `<Text as="div">` so block-level `ReactNode` content (a list, a nested paragraph) can't land inside an invalid `<p>`.
- `question` renders inside the trigger `<button>` via accessible-name-from-content — documented as needing to stay non-interactive (no nested link/button), which the type system can't enforce.

### Added — `theme.size.control` and GlamUI's first component-token file, `Button.tokens.ts`

`Button`'s four per-size heights were raw, unreferenced literals (`36px`/`40px`/`44px`/`48px`), and `md`'s `44px` silently duplicated `theme.size.minTouchTarget` without referencing it — a private, hand-duplicated lookup map of exactly the kind `docs/TOKEN_ARCHITECTURE.md`'s Layer 2 exists to close.

- `theme.size.control.{xs,sm,md,lg}` (`src/tokens/size.ts`) names the scale as a semantic token.
- `Button.tokens.ts` is GlamUI's first component-token file (`docs/TOKEN_ARCHITECTURE.md`, Layer 2) — `buttonTokens.height(theme, size)` resolves a `ButtonSize` to its semantic token, referencing only `theme`, never a raw literal. `Button.styles.ts` now reads its per-size heights through it instead of inline numbers.
- No visual change — all four values are numerically identical to what they replace.

### Fixed — `Searchbar` duplicated `Button`'s `xs` height as an unreferenced literal

`Searchbar.styles.ts` hardcoded its own `height: 36px` — the same value as `Button`'s `xs`, with no shared name tying the two together, so either could drift out of sync with the other with nothing to catch it. Now that `theme.size.control.xs` exists (see `Button.tokens.ts`), `Searchbar` reads it directly — a single fixed height doesn't need its own component-token file, the same discipline `TextInput`/`Select`/`DateInput` already follow via `theme.size.field`. No visual change.

### Added — `Box`'s `border` prop accepts a single side

A follow-up audit of the reference app (beyond the pages already covered by `Box`/`Stack`) found `Box`'s all-sides-only `border: boolean` couldn't express four real, independent consumers that only wanted one side: `TopBar`'s `Bar` (`border-bottom`), `Sidebar`'s `Nav` (`border-right`), `shared/PropsTable.tsx`'s `Th`/`Td` (`border-bottom`), and `Tokens.tsx`'s `Row` divider (`border-bottom`).

- `border` now accepts `boolean | 'top' | 'right' | 'bottom' | 'left'` — `true` keeps the existing all-sides behavior (non-breaking), a side name renders `border-{side}` only.
- No new tokens — still reads `theme.colors.border.default`.

### Fixed — `Text` silently dropped `className`/`style`/other HTML attributes

`Text.tsx` only ever destructured its own named props — a consumer-passed `className`, `style`, `id`, or `data-*` never reached the rendered element, and worse: styled-components' `.attrs()` merges its return value *over* incoming props, so even wiring `{...rest}` through without also fixing `.attrs()` would have silently swallowed a consumer's `className`/`style` rather than combining them. This is why `Tokens.tsx`'s `Value` (a `span`, small, muted — otherwise exactly `Text`) stayed a hand-rolled `styled.span`: it needed `display: block; margin-top: 2px` with no way to attach it. `Box`/`Stack`/`Clickable` already extend `HTMLAttributes` and forward the rest; `Text` was the odd one out.

- `TextProps` now extends `HTMLAttributes<HTMLElement>` (`Omit`ting `color`, which `Text` already types as `TextColor`).
- `Text.tsx` spreads `...rest` onto the rendered element.
- `Text.styles.ts`'s `.attrs()` callback now reads the incoming `className`/`style` and merges them with its own generated class list and truncate-clamp style, instead of overwriting them.

### Added — `theme.fonts.mono` and `Text as="code"`

Traces to the same reference-site audit as `Box`/`Stack`: `Tokens.tsx`'s `Path` and `shared/CodeBlock.tsx`'s `Pre` each hardcoded the identical `font-family: 'Menlo', 'Consolas', monospace` inline, because `Text` had no `'code'` option in its `as` union and no mono font token existed to read — two independent, already-real consumers, clearing the "a real second use case, not a speculative one" bar for a new token.

- `fonts.mono` added to both `lightTheme` and `darkTheme` (`src/styles/themes/{light,dark}.ts`) — identical value in both, a monospace stack has no light/dark variation.
- `Text`'s `as` union gains `'code'`; `<Text as="code">` now switches to `theme.fonts.mono` via a `text-code` class, following the existing `text-{variant}` styling pattern.

### Added — `Stack`, a flex layout primitive

Traces to the same audit that produced `Box`: the other repeated shape found duplicated across the reference site (`Form`, `ProfileRow`, `Tile`) was a plain flex row/column wrapper — `display: flex; flex-direction; gap; align-items` hand-written inline against `theme.spacing`, three times on one page. Per the Component Evolution Program's Capabilities → Patterns → Primitives → Components ordering, this is the primitive tier, alongside `Box`. See `Stack`'s own README for the full Design Brief.

- Five composable layout props (`direction`, `gap`, `align`, `justify`, `wrap`) mapping directly to flex properties — no responsive system layered on speculatively.
- Sensible defaults (`column`, `theme.spacing.md` gap, `stretch` align) rather than an unstyled no-op — a stack with no layout behavior wouldn't be a stack.
- Reads only the pre-existing `spacing` token — no new tokens. A `Grid` primitive was considered and deferred: the reference site's one CSS-grid usage isn't a second real use case yet.

### Added — `Box`, a token-driven container primitive

Traces to a repeated capability gap surfaced while auditing hand-rolled `styled-components` on the reference site: the same bordered/padded/rounded/surfaced container shape (`Card`, `CardBody`, `Swatch`, a plan-card wrapper) was hand-built three separate times on one page alone, mirroring the same pattern already duplicated internally inside `Card`, `MessageBar`, and `Modal`. Per the Component Evolution Program's Capabilities → Patterns → Primitives → Components ordering, this is the primitive tier. See `Box`'s own README for the full Design Brief.

- Independent, composable props (`padding`, `radius`, `background`, `border`, `as`) rather than a fixed variant enum — no shared small set of names covers every existing usage.
- Unstyled by default — every prop is optional, matching `Clickable`'s "no visual opinion until asked" precedent.
- Reads only pre-existing tokens (`spacing`, `radius`, `colors.surface`, `colors.border`) — no new tokens.

### Added — `Accordion`, the landing page's confirmed one genuine component gap

Traces to a named gap in the Landing Page Execution Plan (§3, §8): the FAQ section needed expand/collapse semantics, and nothing in the catalog provided them — `Menu`'s interaction model (a transient dropdown) was checked first and ruled out as a different pattern, not a fit, before this component was justified. Built through the full Component Evolution Program lifecycle; see `Accordion`'s own README for the complete Design Brief.

- Prop-driven (`items: AccordionItem[]`), matching `Menu`'s existing precedent of data-driven composition over a compound-component API — the smallest API the named use case (an FAQ list) actually needs.
- Single-item-open by default (`allowMultiple` opts into independent items) — the common FAQ pattern, keeps a long list scannable.
- Full WAI-ARIA Authoring Practices accordion pattern: `aria-expanded`/`aria-controls` on each trigger, `aria-labelledby`/`role="region"` on each panel, `ArrowUp`/`ArrowDown`/`Home`/`End` keyboard navigation between triggers (wrapping at the ends), collapsed panels fully removed from the accessibility tree via `aria-hidden`, not just visually hidden.
- Motion (expand/collapse height transition, chevron rotation) reads the existing `--motion-duration-*`/`--motion-easing-*` CSS custom properties `GlobalStyles` already zeroes under `prefers-reduced-motion` — a new real consumer of that mechanism, no new reduced-motion handling needed.
- Focus-visible glow reuses `focus.ring.width` + `colors.brand.primaryAlpha`, the same pattern `TextInput`/`TextArea`/`Select`/`DateInput` already use (see "Fixed — `focus.shadow` was more broken than 'not theme-aware'" below) — one more real consumer, not a new pattern.
- **`Icons.Chevron`** — the one genuine new addition, and the only reason this isn't a zero-new-surface component: no expand/collapse indicator existed anywhere in the icon set. Added following the exact single-`<path>` pattern every other icon file already uses, kept generic (not scoped to `Accordion` alone) since a chevron is a shape a future disclosure-style component will plausibly need too.
- Zero new spacing/color/z-index tokens — every other value read is pre-existing.
- **A real bug found and fixed before this ever shipped**: the collapsed-panel `grid-template-rows: 0fr` technique still let each answer's `padding-bottom` render as visible height — a CSS Grid item's automatic minimum size accounts for its own padding even with `min-height: 0` set, so a padded element directly inside the animated grid track can't actually collapse to zero. Caught by screenshot verification, not by the unit tests (`aria-hidden`/`aria-expanded` were correct the whole time, so the accessibility-tree assertions never saw it — only the rendered pixels showed every answer visible at once). Fixed by splitting the panel into `PanelInner` (the grid item — `min-height: 0`, no padding) and `PanelContent` (the padded, colored text wrapper, nested one level deeper, outside the grid sizing math).

### Fixed — a real bug found by double-checking a previous fix, not a design decision

Re-verifying the earlier CTA-contrast fix surfaced that `colors.text.inverse` was quietly serving two different roles that only coincided by luck in the light theme: pairing with `surface.inverse` (Tooltip — correct, unchanged) and pairing with `brand.primary` (Button, SegmentedControl, DateInput's selected day — a different surface with a different contrast requirement, incorrectly assumed covered). All three of the latter were failing WCAG AA in the light theme (white text on `#EA638C` measures 3.15:1); nothing had caught this because it had only ever been checked for `Button` and only in the dark theme, where the two roles happen to need the same value.

- Added `colors.text.onBrand` (light: `palette.gray[900]`; dark: the theme's existing Midnight) — distinct from `text.inverse` on purpose now. Verified: 5.63:1 light, 5.43:1 dark, both pass AA.
- `Button`, `SegmentedControl`, and `DateInput`'s selected-day styling all repointed to it. `DateInput` had additionally been reading `colors.background.page` for this — the exact same category of role-confusion the light-theme `GlobalStyles` background bug was, caught the same way, by checking rather than assuming.
- No new hex value was invented anywhere in this fix — both light and dark values already existed in their respective palettes for other reasons.

### Fixed — `focus.shadow` was more broken than "not theme-aware"

Re-examined after being flagged as a dark-mode gap: `focus.shadow`'s hardcoded `rgba(255, 255, 255, 0.25)` white glow is also nearly invisible in the *light* theme — a translucent white ring on a white page has almost no visible contrast. This is a WCAG 2.4.7 (focus visible) problem, not just a missing dark-mode variant.

- Removed `focus.shadow` from `tokens/focus.ts`; that file now holds geometry only (`ring.width`, `ring.offset`), matching what its own doc comment already claimed the category was for.
- `TextInput`, `TextArea`, `Select`, and `DateInput` now compose their `:focus-visible` glow from `focus.ring.width` + `colors.brand.primaryAlpha` — a real, theme-aware, actually-visible colored glow, verified in both themes' rendered output.
- `colors.brand.primaryAlpha` is no longer `@deprecated` — it has a real consumer now. Value unchanged in both themes.
- This is a token *removal*, technically a breaking change by the versioning rules above — allowed here without a deprecation cycle because `focus.shadow` was introduced in this same unreleased body of work and has no external consumer to protect yet.

### Fixed — three more hardcoded values found and closed

- `Card`/`CardSkeleton`'s `@media (max-width: 640px)` (12 occurrences across both files) now reads `theme.breakpoints.sm`, which is exactly 640 — an existing token, not a new one. Their `360px` squeeze-points (4 occurrences) were deliberately left as documented local constants: that value isn't in the breakpoints scale, and deciding whether it should become one is a scale decision, not a mechanical fix.
- `ImageCropModal`'s hardcoded `#000` crop-stage background is now `colors.surface.canvas` — the same value (`#000000`) in both themes, on purpose: an image-crop canvas conventionally stays black regardless of the surrounding app's theme, matching how photo editors work generally.
- `check:contrast` now checks **both** themes (was light-only) and can correctly evaluate translucent `rgba()` background values via real alpha compositing. The previous version silently mis-parsed any `rgba()` token as pure black — caught by hand-deriving one of the dark-theme feedback ratios and finding it didn't match the number `colors.dark.ts`'s own comments said it should be. Fixed before trusting any of the numbers it now reports.

### Fixed — the last open contrast failure, with a real color decision

`colors.text.muted` on `colors.background.page` was `#9ca3af`, 2.54:1, failing WCAG AA (needs 4.5:1). Three options were laid out (reuse `text.secondary` outright; the same gray at reduced opacity; a genuinely new intermediate gray step) with real numbers for each. `#64748b` was chosen — a new `gray[500]` added to the palette between the existing `gray[400]` and `gray[600]`, keeping the light theme's three-tier text hierarchy (primary/secondary/muted) visually distinct rather than collapsing two roles into one.

- `colors.text.muted` now reads `palette.gray[500]` instead of `palette.gray[400]`. Measures **4.76:1**, passes AA.
- `colors.border.muted` and any other consumer of `gray[400]` are unaffected — only the text role moved; the border role is a different (non-text, contrast-exempt) use and was left alone on purpose.
- `check:contrast` now reports **22/22 pairs passing WCAG AA across both themes** — the first time every checked pair has passed since the script existed.

### Added — four new components, built as a stress test of the token system

`Tooltip`, `SegmentedControl`, `ProgressRing`, and `CommandPalette` — built using only existing tokens plus whatever gaps they honestly exposed, which were fixed in the foundation rather than worked around locally. Every new token below exists because a real component needed it, not speculatively:

- **`colors.surface.inverse`** (paired with the already-existing `colors.text.inverse`) — every other floating element sits on the theme's own surface tone, but `Tooltip` needs to read clearly regardless of what's behind it, the conventional inverted-polarity pattern. Light: `palette.gray[900]`. Dark: `darkPalette.text.primary` (the theme's own lightest tone, not a new hex). Verified at 17.74:1 in both themes — mirrors "Body text on page" and "Primary text on Midnight" with the roles swapped.
- **`zIndex.tooltip` (1200)** — nothing sat above `popover` (1100) for content that must render above any other floating element, including an open `Modal` or `Menu`. The concrete trigger the original `zIndex` doc comment asked for before adding a new distinct value.
- **`size.circle` (`sm`/`md`/`lg`: 40/72/120px)** — promoted from `Avatar`'s private `SIZE_MAP`, duplicated by hand between `Avatar.styles.ts` and `AvatarSkeleton.styles.ts` since before this token system existed (flagged in the original audit, never closed). `ProgressRing` needed the identical three diameters — the second independent use the extensibility rule asks for. Both `Avatar` and `AvatarSkeleton` now read this token instead of their own copies; values unchanged.
- **`colors.overlay.scrim`** — promoted from a bare `rgba(0, 0, 0, 0.45)` that had lived directly in `Modal.styles.ts`, untokenized, since before color was in scope for the earlier token migration. `CommandPalette` needed the identical value for its own backdrop. `Modal`'s `Overlay` now reads this token instead; value unchanged. Kept identical between light and dark themes — a black scrim dims whatever's behind it regardless of the theme's own polarity.
- **`colors.overlay.loading`** — promoted the same way, from `LoadingOverlay`'s previously hardcoded `rgba(255, 255, 255, 0.78)`. Unlike `scrim`, this one does follow theme polarity: dark theme uses a translucent Midnight (`rgba(17, 19, 26, 0.78)`) instead of white, since a white flash over an otherwise-dark UI would look wrong.
- **`effects.ts`, a new token category** (`effects.blur.sm = '2px'`) — no existing category fit a backdrop-blur value. Promoted from `LoadingOverlay`'s previously one-off `backdropFilter: blur(2px)` once `CommandPalette` needed the identical value for its own backdrop. Starts with one value, not a scale, per the same evidence-based standard applied everywhere else in this system.
- **`CommandPalette`'s focus trap** (`hooks/useFocusTrap.ts`) is the first real focus trap in the library: initial focus, `Tab`/`Shift+Tab` cycling confined to the panel, body scroll lock while open, focus returned on close. `Modal` was flagged as missing exactly this in the original audit and still is — deliberately not backported here, since promoting this hook for `Modal` to share is a decision about `Modal`, not one a new component should make unilaterally.

Two more real component fixes fell out of this round without touching a token:

- `Menu`'s ARIA pattern (`role="menu"`/`role="menuitem"`) and `Searchbar`'s (`role="searchbox"`, `aria-label` from the placeholder) were both reused as-is for `CommandPalette` rather than inventing a third convention — an ARIA-pattern consistency check this build exercise happened to run.
- No component in the library drew an SVG stroke before `ProgressRing`; nothing needed changing, but it's the first one, worth noting for the next component that draws a chart or a gauge.

### Added — foundation categories from the previous round

- Five new semantic token categories, closing gaps identified by a token-system audit: `motion` (`duration.*`, `easing.*`), `opacity` (named interaction states), `zIndex` (named stacking order), `focus` (`ring.*`, `shadow`), and `size` (recurring pixel sizes: `field`, `calendarDay`, `iconSlot`, `minTouchTarget`).
- A theme registry (`styles/themes/`): `themes.light` and a `ThemeName` type, replacing a single flat theme object with a shape that a second theme (dark mode, a future brand) can be added to without any component change.
- `breakpoints` wired into the theme object — previously exported standalone and unreachable from `props.theme`/`useTheme()`.
- A generated token manifest (`tokens/manifest.ts`, `tokens/manifest.json`), derived from the token source files' own shape and `@deprecated` JSDoc via `scripts/generate-token-manifest.cjs`. Regenerate with `pnpm generate:manifest`; it also runs automatically before `pnpm build`, so it can't go stale relative to a published build.
- A `no-restricted-imports` ESLint rule in `apps/web` (scoped to `src/app/**` and `src/features/**`) blocking direct `@glamui/react/tokens` imports, closing the one theme-boundary bypass found in review.
- An ESLint rule in `packages/ui` (scoped to `src/components/**/*.styles.ts`) flagging raw literals for the four categories a CSS property name makes unambiguous: durations, opacity fractions, z-index numbers, and focus outline geometry. Deliberately does not cover `size`, `color`, or `spacing` — those are too easy to false-positive on legitimate one-off values with a regex-based rule; this is a partial, honest fix, not full token enforcement.
- Every `motion` token published as a CSS custom property on `:root` via `GlobalStyles`, overridden to `0.01ms` under `@media (prefers-reduced-motion: reduce)`. All 8 components that animate now read `var(--motion-duration-*, <theme fallback>)` / `var(--motion-easing-*, <theme fallback>)` instead of interpolating the theme value straight into the generated CSS — the fallback keeps animation working correctly even where `<GlobalStyles />` isn't mounted (Storybook isolation, an embedding consumer that forgot to render it); it just won't respect reduced motion there, since there's nothing to override.
- `scripts/check-contrast.cjs` (`pnpm check:contrast`): computes real WCAG contrast ratios for ten color pairs GlamUI components actually put together, resolved through the generated manifest rather than hand-copied hex values. Exits non-zero on an AA failure so it can be wired into CI once the team decides to gate on it — not wired in yet, report-only for now.
- **The first real second theme.** `themes.dark`, built from the proposed GlamVault dark palette, by decision scoped to dark mode only — the light theme's brand pink is unchanged. New primitive/semantic files: `tokens/colors.palette.dark.ts`, `tokens/colors.dark.ts`, `tokens/shadows.dark.ts`, `styles/themes/dark.ts`. `spacing`, `typography`, `radius`, `motion`, `opacity`, `zIndex`, `focus`, `size`, and `breakpoints` are reused as-is from the light theme — only `colors` and `shadows` differ. `styles/themes/index.ts` now type-checks every theme against `light`'s exact shape (`ThemeTokens`), the guard the original architecture design called for and that had never actually been exercised until this theme existed to test it against.
- `colors.surface.elevated` is genuinely used now — Slate, distinct from `surface.default`'s Graphite, giving the dark theme the card-vs-dialog depth the proposal asked for. In the light theme both are still `#ffffff`, so nothing there changes; its `@deprecated` note in `colors.ts` was removed since it's no longer accurate.

### Changed

- ~18 component style files migrated off hardcoded literals onto the five new token categories (durations, easings, opacity decimals, z-index numbers, focus-ring geometry, recurring pixel sizes). Every migrated value matches what the component already rendered — this is a token-reference swap, not a visual change.
- `GlobalStyles`'s page background now reads `colors.background.page` instead of `colors.text.inverse`. Both resolve to the same white; the token being read now names the role it actually plays.
- Several form fields (`TextInput`, `TextArea`, `Select`, `DateInput`, `FileInput`) had their background corrected from `colors.text.inverse` to `colors.surface.default` for the same reason — same rendered color, correct semantic role.
- `apps/web`'s `BottomNavItem` now reads `colors.text.muted` through `useTheme()` instead of importing `@glamui/react/tokens` directly.
- `Button`'s primary-variant label color repointed from `colors.background.page` to `colors.text.inverse` — the semantically correct role ("text that sits on a colored/dark button"), and the fix that makes the dark theme's CTA render with dark text instead of white. In the light theme both tokens are `#ffffff`, so this renders identically there.
- `Modal`, `Menu`'s dropdown, `DateInput`'s calendar popover, and the text-like form-field backgrounds (`TextInput`, `TextArea`, `Select`, `DateInput`, `FileInput`) repointed from `colors.surface.default` to `colors.surface.elevated`, so they get their own surface tone in the dark theme (Slate) distinct from `Card`'s (Graphite). Deliberately left `DateInput`'s `NavButton` and day-cell buttons on `surface.default` — they sit inside the now-Slate popover and stay visually distinct against it by keeping Graphite. Renders identically in the light theme (`elevated` and `default` are both `#ffffff` there).

### Deprecated

Fourteen token exports found to have zero real consumers, marked `@deprecated` in place rather than removed:

- `colors.text.success`, `colors.text.warning`, `colors.text.info` — use `colors.feedback.successText` / `warningText` / `infoText`.
- `colors.background.danger`, `colors.background.success`, `colors.background.warning`, `colors.background.info` — use `colors.feedback.errorBg` / `successBg` / `warningBg` / `infoBg`.
- `colors.border.danger` — no replacement; simply unused.
- `colors.surface.subtle`, `colors.surface.elevated` — unused; `surface.subtle` is also the one non-monotonic step in the gray ramp.
- `colors.brand.primaryAlpha` — unused.
- `shadows.sm`, `shadows.lg` — unused; only `shadows.md` has a consumer.
- `typography.lineHeights.relaxed` — unused; only `tight` and `normal` have consumers.

The exact count (14) comes from the generated manifest, not from memory — an earlier internal summary of this same work undercounted it as eleven before the manifest existed to check against.

### Fixed

- `zIndex.dropdown` / `zIndex.modal` — resolved with a decision, not a value change. Both remain `1000` deliberately: checked directly against `apps/web` usage, a `Menu` and a `Modal` never render as parent/child today (where a card offers both, they're alternate states of one interaction, not simultaneous ones), so there's no real stacking order to get wrong yet. The reasoning is now recorded in `tokens/zIndex.ts` itself, with the concrete trigger for revisiting it (a future component needing both open at once) stated explicitly.

### Found, not fixed at the time — both since resolved

`pnpm check:contrast` originally surfaced two real WCAG AA failures: the primary button label (fixed — see "Fixed — a real bug found by double-checking a previous fix" above) and `colors.text.muted` on `colors.background.page` (fixed — see "Fixed — the last open contrast failure, with a real color decision" above). Both required an actual color decision rather than a mechanical fix; both were left open until that decision was made rather than resolved unilaterally.

### Added — the Component Evolution Program, and `EmptyState` as its reference implementation

Established `docs/COMPONENT_EVOLUTION_PROGRAM.md`: the lifecycle (Idea → Product Capability → Design Brief → Implementation → Accessibility Review → Stories → Tests → Documentation → Validation → Merge → Release), a Design Brief template, a component quality checklist, and the prioritization rule every future component now follows — capabilities before patterns before primitives before components, never the reverse.

`EmptyState` is the first component built through it, and the reference other components should be measured against:

- Traces to a named gap in the Product Capability Map — every list-based screen (Inventory, Wishlist, Search, Collections) needed a consistent zero-content state and had none.
- One component, no variant prop — first-run, no-results, and error-caused-empty (the three copy patterns the capability map named) are the same component with different `title`/`description`/`action`, not three components or a variant enum encoding content decisions into the API.
- Composes existing primitives (`Text` for typography, whatever `Icon`/`Button` the consumer passes) rather than owning typography or button behavior itself.
- Deliberately renders its title as a paragraph, not a heading — documented in its README as an accessibility decision, not an oversight: a reusable primitive can't safely assume what heading level its title should be in an arbitrary page's outline.
- No motion — the capability map called this out explicitly as unneeded, and none was added.
- Zero new tokens; uses only pre-existing `spacing` and `colors.text.muted`.

## Known gaps at this point in the changelog's history

Recorded for continuity — most of the items the previous round of work left open are now closed; what's left is noted below.

- The lint rule covers motion, opacity, z-index, and focus — not `size`, `color`, or `spacing`, which are harder to enforce safely with a regex-based rule.
- ~~`ImageCropModal`'s crop-surface background and `Card`/`CardSkeleton`'s breakpoint media queries remain hardcoded~~ — fixed, see above. `Card`/`CardSkeleton`'s `360px` squeeze-point is a deliberate exception, documented in place, not an oversight.
- ~~`focus.shadow`'s hardcoded white glow isn't theme-aware~~ — fixed, see above; turned out to be a real visibility bug in both themes, not just a dark-mode gap.
- ~~`check:contrast` only checks the light theme~~ — fixed, see above; also fixed a real parsing bug found while extending it (translucent `rgba()` values were silently read as black).
- `check:contrast` covers eleven pairs chosen because a real component actually puts them together — it is not exhaustive, and a new component pairing two existing colors in a new way should add its pair to the script rather than assume it's covered.
- No third theme (a future brand, high-contrast mode) exists yet, but the type-level guard in `styles/themes/index.ts` has now been exercised by both fixing a real second theme's values and repointing several components' color references — real load, not a hypothetical shape.
