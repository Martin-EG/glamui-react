# @glamui/react

Shared React UI component library for GlamVault, the GlamVault landing page, and other GlamVault surfaces. Extracted from the `glamvault-client` monorepo (`packages/ui`) into its own repository so it can be installed as a standalone npm package.

## Stack

- React 19 + TypeScript
- styled-components (theme in `src/styles/theme.ts`)
- tsup (build: ESM + CJS + `.d.ts`)
- Storybook (`@storybook/react-vite`)
- Jest + Testing Library

## Scripts

- `pnpm build` — build the package to `dist/`
- `pnpm dev` — build in watch mode
- `pnpm test` — run unit tests
- `pnpm storybook` — component playground on :6006
- `pnpm generate:component Foo` — scaffold a new component under `src/components/Foo`

## Status

24 components, a two-layer token system (primitive → semantic) with a light and dark theme, and `GlobalStyles`. See `CHANGELOG.md` for what's shipped and when — the component list isn't repeated here so this section can't go stale the way a hand-maintained one does.

The library has zero framework coupling: `next/image` (in `LoadingAnimation`) was swapped for a plain `<img>` behind a `basePath` prop, and `next-intl` was replaced with optional label/text props that default to English copy — override them per-app instead of relying on a shared message catalog.

See `docs/GLAMUI_DESIGN_VISION.md` (why this exists and what it optimizes for), `docs/FOUNDATION_SYSTEM.md` (how it actually works today), and `docs/TOKEN_ARCHITECTURE.md` (target architecture, not yet built) for everything beyond this file.

To scaffold a new component: `pnpm generate:component Foo` — wires it into `src/index.ts`, tests, stories, and a README stub automatically.

## Installing

Once published to npm:

```sh
npm install @glamui/react styled-components react react-dom
```

Or directly from GitHub before/without an npm release:

```sh
npm install github:Martin-EG/glamui-react
```

```ts
import { Button, Text, themes } from '@glamui/react';
```

## Publishing

Pushing a tag matching `v*` (e.g. `v0.1.1`) runs the `publish` GitHub Actions workflow, which builds the package and publishes it to npm using the `NPM_TOKEN` repository secret.
