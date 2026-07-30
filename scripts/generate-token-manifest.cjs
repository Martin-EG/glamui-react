/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Generates the token manifest from the token source files themselves —
 * their exported object shape and any `@deprecated` JSDoc attached to a
 * property — rather than a hand-maintained list that can drift out of
 * truth. Run via `pnpm generate:manifest`; it also runs automatically
 * before `pnpm build`.
 *
 * Do not hand-edit `src/tokens/manifest.json` or `manifest.ts` — edit the
 * token files and regenerate.
 */
const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const TOKENS_DIR = path.join(__dirname, '../src/tokens');
const BREAKPOINTS_FILE = path.join(__dirname, '../src/styles/breakpoints.ts');

const SOURCES = [
  { file: path.join(TOKENS_DIR, 'colors.palette.ts'), layer: 'primitive' },
  { file: path.join(TOKENS_DIR, 'colors.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'spacing.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'typography.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'radius.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'shadows.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'motion.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'opacity.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'zIndex.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'focus.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'size.ts'), layer: 'semantic' },
  { file: BREAKPOINTS_FILE, layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'colors.palette.dark.ts'), layer: 'primitive' },
  { file: path.join(TOKENS_DIR, 'colors.dark.ts'), layer: 'semantic' },
  { file: path.join(TOKENS_DIR, 'shadows.dark.ts'), layer: 'semantic' },
];

function extractDeprecation(fullText, node) {
  const ranges = ts.getLeadingCommentRanges(fullText, node.getFullStart()) || [];
  for (const range of ranges) {
    const commentText = fullText.slice(range.pos, range.end);
    const match = commentText.match(/@deprecated\s*([^\n*]*)/);
    if (match) {
      return match[1].trim() || true;
    }
  }
  return undefined;
}

function unwrapAsConst(expr) {
  return ts.isAsExpression(expr) ? expr.expression : expr;
}

function walkObjectLiteral(objectLiteral, fullText, pathPrefix, entries, fileLabel, layer) {
  for (const prop of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) continue;

    const key = prop.name.getText(prop.getSourceFile());
    const dotPath = pathPrefix ? `${pathPrefix}.${key}` : key;
    const deprecated = extractDeprecation(fullText, prop);
    const initializer = prop.initializer;

    if (ts.isObjectLiteralExpression(initializer)) {
      walkObjectLiteral(initializer, fullText, dotPath, entries, fileLabel, layer);
      continue;
    }

    entries.push({
      path: dotPath,
      layer,
      file: fileLabel,
      value: initializer.getText(prop.getSourceFile()),
      deprecated: Boolean(deprecated),
      ...(typeof deprecated === 'string' ? { deprecatedNote: deprecated } : {}),
    });
  }
}

function collectFromFile({ file, layer }) {
  const text = fs.readFileSync(file, 'utf8');
  const sourceFile = ts.createSourceFile(
    file,
    text,
    ts.ScriptTarget.Latest,
    true,
  );
  const fileLabel = path
    .relative(path.join(__dirname, '..'), file)
    .split(path.sep)
    .join('/');

  const entries = [];

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return;
    const isExported = node.modifiers?.some(
      (m) => m.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) return;

    for (const decl of node.declarationList.declarations) {
      if (!decl.initializer) continue;
      const initializer = unwrapAsConst(decl.initializer);
      if (!ts.isObjectLiteralExpression(initializer)) continue;

      const rootName = decl.name.getText(sourceFile);
      walkObjectLiteral(initializer, text, rootName, entries, fileLabel, layer);
    }
  });

  return entries;
}

function main() {
  const allEntries = SOURCES.flatMap(collectFromFile).sort((a, b) =>
    a.path.localeCompare(b.path),
  );

  const manifest = {
    generatedAt: new Date().toISOString(),
    generatedBy: 'scripts/generate-token-manifest.cjs',
    entryCount: allEntries.length,
    entries: allEntries,
  };

  const jsonPath = path.join(TOKENS_DIR, 'manifest.json');
  fs.writeFileSync(jsonPath, JSON.stringify(manifest, null, 2) + '\n');

  const tsPath = path.join(TOKENS_DIR, 'manifest.ts');
  const tsContent = `/**
 * GENERATED FILE — do not hand-edit.
 *
 * Produced by scripts/generate-token-manifest.cjs from the token source
 * files themselves. Regenerate with \`pnpm generate:manifest\` (also runs
 * automatically before \`pnpm build\`) after changing any token file.
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
  /** Whether this token is marked \`@deprecated\` in its source. */
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
`;
  fs.writeFileSync(tsPath, tsContent);

  console.log(
    `Generated token manifest: ${allEntries.length} entries across ${SOURCES.length} files.`,
  );
}

main();
