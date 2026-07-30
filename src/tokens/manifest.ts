/**
 * GENERATED FILE — do not hand-edit.
 *
 * Produced by scripts/generate-token-manifest.cjs from the token source
 * files themselves. Regenerate with `pnpm generate:manifest` (also runs
 * automatically before `pnpm build`) after changing any token file.
 *
 * This is what makes a token discoverable programmatically — by tooling,
 * or by an AI agent checking whether a value already exists — without
 * having to read every token file's source first.
 */
import manifestData from './manifest.json';

export interface TokenManifestEntry {
  /** Dot-path a component would use to read this token, e.g. "colors.text.primary". */
  path: string;
  /** Which layer this token belongs to. */
  layer: 'primitive' | 'semantic';
  /** Source file the token is defined in, relative to the package root. */
  file: string;
  /** The token's own source expression — not a fully resolved final value. */
  value: string;
  /** Whether this token is marked `@deprecated` in its source. */
  deprecated: boolean;
  /** The deprecation note, when one was given. */
  deprecatedNote?: string;
}

export interface TokenManifest {
  generatedAt: string;
  generatedBy: string;
  entryCount: number;
  entries: TokenManifestEntry[];
}

export const tokenManifest = manifestData as TokenManifest;
