# GlamUI Token Architecture

### The design, not yet the implementation

This document specifies the target token architecture for GlamUI. It is a design, not a migration in progress — no source under `packages/ui/src` changes as a result of this document. It exists so that when the work identified by the token system audit is actually picked up, every contributor and every AI agent is building toward the same shape, one piece at a time, rather than converging on it by accident.

It follows directly from two prior documents: the **GlamUI Design System Vision** (`GLAMUI_DESIGN_VISION.md`), whose Token Philosophy this architecture exists to satisfy in practice, and the token audit, whose findings are the evidence this design responds to. Where the audit found a gap, this document says what should fill it. Where the audit found something already working — the primitive/semantic split, the discipline of reading through `theme` — this document keeps it and builds on it rather than replacing it.

**Guiding constraint, repeated because it governs every decision below: this is evolution, not redesign.** Every rule here is chosen so that it can be adopted incrementally, in the order laid out in the Migration Strategy, without a single cutover moment and without breaking a consumer that doesn't opt in.

---

## 1. Token Layers

GlamUI moves from two layers to four. The first two already exist and are sound; the third is the audit's central recommendation; the fourth formalizes something the theme object already does implicitly.

### Layer 0 — Primitive tokens

Raw values with no meaning attached: color ramps, raw duration and easing values, a raw numeric scale. Primitives are never consumed by components, and after this architecture lands, never consumed by anything outside the semantic layer either — that boundary already holds for color today and should hold for every category.

### Layer 1 — Semantic tokens

Meaning-bearing names that resolve to primitives: "the color that signals danger," "the duration of a fast transition," "the ring width for a focused control." This is the layer every component is meant to read from. Semantic tokens are theme-scoped — the same name resolves to a different concrete value depending on which theme is active (see Layer 3).

### Layer 2 — Component tokens *(new)*

A thin, per-component indirection layer that maps a component's specific needs to semantic tokens: `button.height.md`, `avatar.size.lg`, `modal.zIndex`. This is the layer the audit found missing, whose absence was being filled by private, hand-duplicated lookup maps inside individual component files. Component tokens close that gap without centralizing them — each component owns its own token file, the same way it owns its own styles, tests, and stories.

A component token **may only reference a semantic token. It may never reference a primitive, and it may never contain a raw literal.** This single rule is what prevents the component layer from becoming a second place hardcoded values can hide.

### Layer 3 — Themes *(formalized)*

A theme is a complete assignment of concrete values to every semantic token name. `light` and `dark` are both themes; a future sub-brand or a high-contrast mode is also just a theme. Component tokens never vary by theme — they reference a semantic name, and the theme decides what that name currently means. This is what makes dark mode, future themes, and any future multi-brand need additive: a new theme is a new file, not a new code path through every component.

```
primitive  →  semantic  →  component  →  component styles  →  feature code
                  ↑
               (theme selects the concrete
                value for each semantic name)
```

Dependency direction is one-way and enforced at every arrow. Nothing imports upward. This is the one property from the current system most worth protecting — the audit found the existing dependency graph clean, with a single documented exception (below), and this architecture is designed to keep it that way as the token count grows.

---

## 2. Naming Conventions

Names are the interface. A predictable naming grammar is what lets a human — or an AI agent — guess a token's name correctly before ever reading the file that defines it.

**Primitive:** `<hue>.<step>` — e.g. `pink.500`, `gray.900`. Steps are always numeric and always monotonic: as the number rises, the value darkens (or, for a non-color ramp, intensifies). No alternate casing, no named exceptions inside a ramp (this retires the `Alpha25`-style key found in the audit; alpha variants become a function of a primitive plus an opacity token, not a special palette entry).

**Semantic:** `<category>.<role>.<state?>` — e.g. `color.text.primary`, `color.border.focus`, `color.feedback.danger.text`. One taxonomy per concept. Where the audit found two parallel schemes for the same four status colors (`text.danger` vs. `feedback.errorText`), the semantic layer keeps exactly one: `color.feedback.<status>.<text|background|border>`.

**Component:** `<component>.<property>.<variant?>.<state?>` — e.g. `button.height.md`, `button.color.background.primary.hover`, `avatar.size.lg`. Component token names describe the component's own vocabulary (its variants, its sizes) rather than reusing semantic role names verbatim, so a reader always knows which layer they're looking at from the name alone.

**Category-specific conventions**, chosen to close the exact gaps the audit found:

- `motion.duration.{instant, fast, base, slow}` and `motion.easing.{standard, decelerate, accelerate}` — replacing the 14 hand-typed durations found across 9 files.
- `zIndex.{base, dropdown, sticky, overlay, modal, toast, tooltip}` — a named stacking order, each value spaced apart, replacing the two undocumented raw values (`1000`, `1100`) found in conflict.
- `opacity.{disabled, muted, hover, pressed}` — replacing the recurring raw `0.6` / `0.5` / `0.75` literals.
- `size.control.{sm, md, lg}` — **one** control-height scale, replacing the two incompatible scales the audit found (a 35px form-control height living independently of the button's 36/40/44/48px scale). Deciding whether these converge to one scale or are formally declared distinct is itself a design decision this token category makes explicit instead of leaving implicit.
- `focus.ring.{width, offset, color}` — replacing the seven identical, independently hand-written `2px solid` / `2px offset` declarations.
- `breakpoint.{xs, sm, md, lg, xl}` — the existing scale, unchanged in value, finally addressed through the theme rather than left orphaned beside it.

**Rule of thumb for every new name:** if it can't be explained in one clause using only words from the taxonomy above, it isn't ready to be a token yet.

---

## 3. Ownership Rules

Ownership follows the Constitution's Governance Philosophy: someone is accountable for coherence at every layer, and decentralization is earned, not assumed.

| Layer | Owner | Who may propose changes | Who may approve |
|---|---|---|---|
| Primitive | Design Systems | Design Systems only | Design Systems |
| Semantic | Design Systems | Any contributor, with evidence (see §8) | Design Systems |
| Component | The component's designated owner | The component's owner or any contributor via the normal component review | Component owner, constrained by the semantic-only reference rule |
| Theme | Design Systems | Any contributor proposing a new theme or mode | Design Systems |

Component-token ownership is intentionally decentralized — it lives beside the component, changes with the component, and is reviewed the same way the component itself is. What keeps this safe is not central approval, it's the structural rule that a component token can only point at a semantic token. A component owner can freely retune `button.height.md`'s *reference*, but cannot invent a new raw value while doing it.

---

## 4. Dependency Direction

One direction, four layers, no exceptions:

```
primitive/  →  semantic/  →  components/*.tokens.ts  →  components/*.styles.ts  →  features/  →  app
```

Rules, in order of how much damage violating them does:

1. **Nothing imports upward.** No token file imports from a component, a theme consumer, or app code. This already holds today and should be treated as load-bearing.
2. **Component code never imports a primitive.** Only `semantic/` may import `primitive/`.
3. **Feature and app code never imports a token file directly — only `theme` via `props.theme` (or the equivalent context/hook).** The audit found one live violation of this rule (`BottomNavItem.tsx` importing color tokens directly from the package's `tokens` subpath instead of reading `props.theme`). That import path should be treated as internal to the package once this architecture is enforced, closing the exact bypass that made theming and dark mode unreliable for that one component.
4. **A component's styles reference its own component tokens, not another component's.** Cross-component reuse of a value happens by both components referencing the same semantic token, never by one component reaching into another's token file.

---

## 5. Migration Strategy

Additive first, deprecate second, enforce third, delete last — always in that order, never compressed. Nothing existing is renamed or removed in the same change that introduces its replacement.

**Phase 0 — Add what's missing, touch nothing that exists.**
Introduce `motion`, `zIndex`, `opacity`, `size`, and `focus` as new semantic token files, populated with values already observed in the codebase (the audit's hardcoded-value inventory is effectively the seed data for these files). Wire `breakpoints` into the theme object additively — the standalone export keeps working for any code still importing it directly. No existing component changes yet.

**Phase 1 — Deprecate in place, don't delete.**
Introduce the consolidated `color.feedback.*` taxonomy as the single source going forward; mark the parallel `text.danger/success/warning/info` and `background.danger/success/warning/info` entries as deprecated in the token manifest (§9) with a pointer to their replacement — they keep working. Introduce a corrected, monotonic gray step to replace the out-of-order `gray[300]`; deprecate the old key rather than mutating its value, since mutating it in place would silently change every existing consumer's rendered color.

**Phase 2 — Introduce component tokens, one component at a time.**
For each component, add a `<Component>.tokens.ts` file that captures the sizes, per-variant colors, and states currently hardcoded or duplicated in that component's `.styles.ts` and its skeleton/sibling files. Migrate the component to read from its own token file. This happens component-by-component — there is no moment where all twenty components must move together, and a component that hasn't migrated yet continues working exactly as it does today.

**Phase 3 — Enforce, once coverage is real.**
Add lint rules (import restrictions and, where feasible, a stylelint/codemod check for raw literals in styled-components) for each category once its token coverage is broad enough that the rule catches real regressions rather than blocking legitimate gaps. Close the direct-import bypass identified in §4 by restricting the package's `tokens` subpath export to internal use, or removing it once its one known consumer has migrated to `theme`.

**Phase 4 — Remove what's been safely dead.**
Delete a deprecated token only after it has shipped at least one full minor version with zero remaining consumers (checked mechanically, not by memory) and after the deprecation has been visible in the manifest and changelog for that entire window.

---

## 6. Folder Organization

```
packages/ui/src/tokens/
  primitives/
    color.ts
    motion.ts
    scale.ts            # raw numeric/spacing scale shared by size, spacing, radius
    index.ts

  semantic/
    color.ts
    spacing.ts
    typography.ts
    radius.ts
    shadow.ts
    motion.ts
    zIndex.ts
    opacity.ts
    size.ts
    focus.ts
    breakpoints.ts
    index.ts

  themes/
    light.ts             # the current, default theme
    dark.ts
    index.ts              # theme registry: { light, dark } and the active-theme type

  manifest.ts             # machine-readable token metadata — see §9
  index.ts                # public barrel: semantic tokens + theme registry

packages/ui/src/components/
  Button/
    Button.tokens.ts      # component tokens, colocated, semantic-only references
    Button.styles.ts       # reads from Button.tokens.ts, not from theme directly
    ...
```

Splitting `primitives/` and `semantic/` into their own directories — rather than the current flat `colors.palette.ts` / `colors.ts` pair — makes the layer boundary visible in the filesystem itself once there are ten categories instead of two. That legibility is not cosmetic: it is what lets a new contributor, or an AI agent, infer the import rule ("nothing outside `semantic/` imports from `primitives/`") from the folder structure alone, without having to already know the rule.

Component tokens stay colocated with their component, preserving the one structural pattern the audit explicitly called out as worth keeping.

---

## 7. Versioning Strategy

Token changes follow the same semantic versioning as the rest of the package, with an explicit mapping so a version bump always tells the truth about what kind of change happened:

- **Patch** — a concrete value changes, but no name, shape, or reference changes (e.g. a hex adjusted slightly for contrast within the same semantic role).
- **Minor** — purely additive: a new token, a new category, a new theme, a new component token file. Always safe for existing consumers.
- **Major** — a token name is removed or its meaning changes incompatibly. This only happens at the end of a deprecation window (§5, Phase 4), never as a surprise.

Every token addition, deprecation, and removal gets a changelog entry — the audit noted GlamUI currently has none. The changelog and the manifest (§9) are the same source of truth read two ways: one for humans skimming history, one for tooling checking current state.

---

## 8. Extensibility Rules

- **A new theme is a new file under `themes/`, typed against the same shape as every other theme.** A `type ThemeTokens = typeof lightTheme` definition means the compiler — not a checklist — enforces that a new theme supplies every semantic value light mode does. This is what makes dark mode (already largely designed by this shape) and any future brand or mode purely additive.
- **A new component's tokens are a new `<Component>.tokens.ts`, reviewed with the component.** No central registration step is required or desired.
- **A new semantic category requires evidence, not preference.** Mirroring the standard this audit itself used: a category is proposed once at least two real, independent hardcoded duplicates of the same kind of value exist in the codebase. This is what keeps the semantic layer "few enough to memorize" as the system grows, rather than accumulating a token for every value anyone ever typed twice.
- **Multi-brand and multi-platform readiness is a property of what varies, not a new layer.** A future second brand is a new entry in the theme registry (`glamvault.light`, `glamvault.dark`, `brandX.light`, …); component tokens never need to change, because they only ever reference semantic names. A future non-web platform would supply its own primitive layer (different units, e.g. `dp` instead of `px`) without touching semantic or component names at all — which is why no semantic or component token name may bake in a CSS-specific unit assumption where a unit-agnostic name is possible.

---

## 9. Supporting the Constitution's Harder Requirements

### Accessibility

- A single `focus.ring.*` token set means there is exactly one focus treatment in the system, not seven independently-typed approximations of one.
- Semantic color is defined and reviewed as **text/background pairs**, not individual colors, with a documented minimum contrast requirement per pair. A theme change is only complete when every pair in the new theme still clears that bar — contrast is versioned as a property of the pair, not assumed to survive a palette swap.
- `size.control.min` establishes a minimum interactive target size that no component token may go below, closing the "informal touch target" gap the audit flagged.
- Motion tokens resolve through a documented reduced-motion table: when `prefers-reduced-motion` is active, every `motion.duration.*` token collapses toward zero centrally, so no individual component has to implement its own media query to comply.

### Motion

Motion becomes a first-class semantic category (`motion.duration.*`, `motion.easing.*`) rather than a gap filled by 14 independently-chosen values. Component tokens may name a specific motion recipe (e.g. `button.transition.hover`) but that recipe always resolves to a semantic duration and easing pair — never a raw millisecond value.

### AI-assisted development

- **The manifest (`tokens/manifest.ts`) is the mechanism, not documentation as an afterthought.** For every token it records: full name, layer, category, type, one-line description, the version it was added in, and — once deprecated — the version it was deprecated in and the version after which it may be removed. This is what lets an agent (or a person) determine the *correct* token to reach for programmatically, instead of guessing or, worse, inventing a new hardcoded value that looks locally reasonable.
- **The naming grammar in §2 is deliberately formal enough to be guessable.** An agent that has seen `color.feedback.danger.text` can correctly predict `color.feedback.warning.background` exists, without reading the file that defines it.
- **Lint enforcement (§5, Phase 3) converts a wrong choice into a build failure the agent can see and correct**, rather than a silent style inconsistency that only shows up in a later human review.

---

## 10. Why This Doesn't Need a Redesign in Five Years

The four-layer shape does not grow by adding layers — it grows by adding entries within a layer, which is a bounded, additive operation by construction. A new theme, a new component, a new semantic category, even a new platform, are all expressible as "one more file that conforms to an existing shape," never as "a new kind of relationship between layers." The one thing this architecture asks anyone extending it to protect is the direction of the arrows in §4 — as long as nothing ever imports upward, the system can absorb ten times its current token count without becoming harder to reason about than it is today.
