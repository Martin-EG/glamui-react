# GlamUI Component Evolution Program

This document is the standard workflow every future GlamUI component follows, from idea to release. It exists because GlamUI now evolves in response to real GlamVault product capabilities (see `PRODUCT_CAPABILITY_MAP` in the design system's working history) rather than by adding whatever a component library conventionally includes. A workflow that isn't written down doesn't survive a team change; this one is.

## Component Lifecycle

```
Idea
  ↓
Product Capability
  ↓
Design Brief
  ↓
Implementation
  ↓
Accessibility Review
  ↓
Stories
  ↓
Tests
  ↓
Documentation
  ↓
Validation
  ↓
Merge
  ↓
Release
```

Each stage gates the next. A component doesn't move to Implementation without a Design Brief; it doesn't move to Merge without passing Validation. Skipping a stage isn't a shortcut — it's how a component ends up in the codebase without a reason anyone can point to later.

**Idea → Product Capability.** An idea is not yet a reason to build something. It becomes one only when it traces to a real, named capability GlamVault's product needs — not "other UI libraries have this." If a capability can't be named, the idea waits.

**Product Capability → Design Brief.** Before code, the Design Brief Template (below) is filled out completely. This is where "can an existing primitive already solve this" gets asked and answered honestly, before any new abstraction is justified by sunk implementation effort.

**Design Brief → Implementation.** Built using only approved tokens (`props.theme` / `useTheme()` — never a direct token import), following the folder recipe the generator (`pnpm generate:component`) already produces.

**Implementation → Accessibility Review.** Keyboard support, focus handling, and screen-reader semantics are checked before stories and tests are written around them — writing tests against inaccessible behavior just documents the bug instead of catching it.

**Accessibility Review → Stories → Tests → Documentation → Validation.** Each stage's output already exists in the codebase's own precedent (every real component has all four); this program just makes the order and the bar explicit.

**Validation → Merge → Release.** Validation is the Definition of Done (below), checked in full, not sampled. Release means an entry in `CHANGELOG.md` under the correct classification — nothing merges silently.

---

## Design Brief Template

Every new component answers all of these before implementation starts. A brief that can't answer one of these honestly isn't ready — that's the brief doing its job, not a formality to fill in after the fact.

| Field | Answers |
|---|---|
| **Purpose** | What is this component for, in one sentence? |
| **Problem solved** | What breaks or is awkward today without it? |
| **Capabilities unlocked** | Which named product capability (or capabilities) does this make buildable? |
| **Design principles** | Which Constitution principles does this embody, and which did the brief consider and reject? |
| **Accessibility** | What must a keyboard-only or screen-reader user be able to do with this? |
| **Interaction model** | What does a user do to it, and what happens? |
| **Motion** | Does it need motion at all? If not, say so — "none" is a valid, deliberate answer. |
| **States** | Every distinct visual/behavioral state it can be in. |
| **Variants** | Every distinct configuration a consumer can choose between. |
| **Tokens used** | Which existing tokens does it read? If a gap is found, is it a real second use case or a speculative one? |
| **Dependencies** | Which other components or hooks does it compose? |
| **Future evolution** | What's deliberately left out now but plausible later? |
| **Success criteria** | How would you know, concretely, that this component works? |
| **Non-goals** | What this component is explicitly not trying to solve — the fastest way to keep an API small is to write down what it's not for. |

---

## Component Quality Checklist

Every component includes, before it's considered complete:

- [ ] README
- [ ] Stories
- [ ] Tests
- [ ] Accessibility (keyboard, screen reader, focus)
- [ ] Responsive behavior
- [ ] Motion (or an explicit statement that none is needed)
- [ ] Keyboard support
- [ ] Token usage (no hardcoded visual values)
- [ ] Public API review (is every exported name necessary, named clearly, and going through the barrel correctly?)
- [ ] Documentation
- [ ] Examples
- [ ] CHANGELOG entry

---

## Definition of Done

A component is complete only when:

- It solves a real product capability, traceable to the capability map.
- It follows the GlamUI Constitution.
- It uses only approved tokens — `props.theme` / `useTheme()`, never a direct token import.
- It contains no hardcoded visual values.
- It is fully documented (README, Foundation Notes where relevant, Accessibility Notes).
- Accessibility has been verified, not assumed.
- Tests pass.
- Storybook examples exist and cover its real states/variants, not just a default.
- CHANGELOG has been updated under the correct classification.

---

## Prioritization Rules

```
Capabilities
  ↓
Patterns
  ↓
Primitives
  ↓
Components
```

Always in this order, never reversed. A capability comes first — what does GlamVault's product actually need to be true on screen. Only once that's understood is it worth asking whether an existing pattern (a composition of components already in the catalog) already satisfies it. Only once that's ruled out is a new primitive (a token-level or behavioral building block) considered. Only once a primitive is justified does a new component get built around it. Building a component first and looking for its justification afterward is the exact inversion this program exists to prevent.

---

## Evolution Rules

- **Prefer extending existing primitives** over introducing new ones. The bar for "this needs to be new" is a real, named gap — not preference.
- **Avoid overlapping abstractions.** If two components could plausibly solve the same problem, one of them is wrong.
- **One component, one responsibility.** A component that's doing two jobs should be two components, or a composition of one component and existing ones.
- **Composition over inheritance.** Extend behavior by composing existing components (as `Modal` composes `Button`/`Text`/`IconButton`/`Icon` today), not by growing one component's prop surface to cover every case.
- **Small APIs.** Every prop is something a consumer will actually need, not something that might be nice. A prop is easier to add later than to deprecate.
- **Predictable behavior.** A component should behave the same way every place it's used — no hidden context-dependent branching a consumer can't see from its props.

---

## Documentation Rules

Every component receives:

- **README** — purpose, usage example, props table.
- **Stories** — real states and variants, not just a bare default.
- **Tests** — behavior, not implementation detail.
- **Examples** — realistic usage, not synthetic placeholder content.
- **Foundation Notes** — only when building the component surfaced a real gap in the token system that was fixed rather than worked around (see `Tooltip`'s README for the precedent). Omitted entirely when nothing came up — a Foundation Notes section that always exists whether or not there's something to say becomes noise, not documentation.
- **Migration Notes** — when applicable: what changes for an existing consumer, and why.
- **Accessibility Notes** — what a keyboard-only or screen-reader user experiences, explicitly, not left implicit in the props table.

---

## Review Process

Every pull request adding or changing a component answers, in the description:

1. **Why does this component exist?** — traced to a named product capability.
2. **What capability does it unlock?**
3. **Why can't an existing component solve this?** — what was actually tried or considered first.
4. **What principles from the Constitution does it reinforce?**

A PR that can't answer these isn't ready for review — it's ready for a Design Brief.

---

## Success Metrics

This program is working when:

- New components require minimal discussion, because the Design Brief already resolved the open questions before implementation started.
- Contributors follow a predictable workflow without needing to ask what's expected.
- AI generates components consistent with GlamUI's actual conventions — because the lifecycle, the brief, and the checklist are all written down, not inferred from reading 24 examples.
- Every component in the catalog traces back to a real product capability, checkable by anyone, at any time, without asking the person who built it.
