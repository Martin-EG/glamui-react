/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Checks WCAG contrast ratios for real color pairs, in both themes,
 * resolved through the generated token manifest. Run
 * `pnpm generate:manifest` first if you've just changed a token file.
 * To check a new pair: add an entry to PAIRS with theme-relative paths
 * (no `colors.`/`colorsDark.` prefix) and its kind (text or non-text).
 */
const fs = require('fs');
const path = require('path');

const MANIFEST_PATH = path.join(__dirname, '../src/tokens/manifest.json');

const THEMES = [
  { name: 'light', prefix: 'colors' },
  { name: 'dark', prefix: 'colorsDark' },
];

const PAIRS = [
  {
    name: 'Body text on page',
    fg: 'text.primary',
    bg: 'background.page',
    kind: 'text',
    usedIn: 'GlobalStyles body text; most default Text usage',
  },
  {
    name: 'Secondary text on page',
    fg: 'text.secondary',
    bg: 'background.page',
    kind: 'text',
    usedIn: 'Text variant="light"; helper/caption copy',
  },
  {
    name: 'Muted text on page',
    fg: 'text.muted',
    bg: 'background.page',
    kind: 'text',
    usedIn: 'Text variant="muted"; placeholders; disabled-adjacent copy',
  },
  {
    name: 'Primary button label',
    fg: 'text.onBrand',
    bg: 'brand.primary',
    kind: 'text',
    usedIn:
      'Button variant="primary"; SegmentedControl selected segment; DateInput selected day',
  },
  {
    name: 'Tooltip label',
    fg: 'text.inverse',
    bg: 'surface.inverse',
    kind: 'text',
    usedIn: 'Tooltip',
  },
  {
    name: 'Error text on error background',
    fg: 'feedback.errorText',
    bg: 'feedback.errorBg',
    kind: 'text',
    usedIn: 'MessageBar variant="error"',
  },
  {
    name: 'Success text on success background',
    fg: 'feedback.successText',
    bg: 'feedback.successBg',
    kind: 'text',
    usedIn: 'MessageBar variant="success"',
  },
  {
    name: 'Warning text on warning background',
    fg: 'feedback.warningText',
    bg: 'feedback.warningBg',
    kind: 'text',
    usedIn: 'MessageBar variant="warning"',
  },
  {
    name: 'Info text on info background',
    fg: 'feedback.infoText',
    bg: 'feedback.infoBg',
    kind: 'text',
    usedIn: 'MessageBar variant="info"',
  },
  {
    name: 'Danger menu item on surface',
    fg: 'text.danger',
    bg: 'surface.default',
    kind: 'text',
    usedIn: 'Menu item variant="danger"; Text variant="danger"',
  },
  {
    name: 'Focus ring on page',
    fg: 'border.focus',
    bg: 'background.page',
    kind: 'non-text',
    usedIn: 'every :focus-visible outline (theme.focus.ring)',
  },
];

const THRESHOLDS = {
  text: { AA: 4.5, AAA: 7 },
  'non-text': { AA: 3, AAA: 3 },
};

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error(
      'tokens/manifest.json not found. Run `pnpm generate:manifest` first.',
    );
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
}

function buildResolvers(manifest) {
  const byPath = new Map(manifest.entries.map((e) => [e.path, e.value]));

  function stripQuotes(str) {
    return str.replace(/^['"]|['"]$/g, '');
  }

  function toPrimitivePath(expr) {
    // "palette.gray[900]" -> "palette.gray.900"; "palette.white" -> "palette.white"
    return expr.replace(/\[(\w+)\]/g, '.$1');
  }

  function resolve(tokenPath) {
    const raw = byPath.get(tokenPath);
    if (!raw) {
      throw new Error(`Unknown token path in manifest: ${tokenPath}`);
    }
    if (raw.startsWith("'") || raw.startsWith('"')) {
      return stripQuotes(raw);
    }
    // Otherwise it's a reference expression, e.g. "palette.gray[900]" or
    // "darkPalette.pink.glam".
    const primitivePath = toPrimitivePath(raw);
    const primitiveRaw = byPath.get(primitivePath);
    if (!primitiveRaw) {
      throw new Error(
        `Could not resolve "${tokenPath}" -> "${raw}" -> "${primitivePath}" against the primitive layer.`,
      );
    }
    return stripQuotes(primitiveRaw);
  }

  return { resolve };
}

function hexToRgb(hex) {
  const normalized = hex.replace('#', '');
  const full =
    normalized.length === 3
      ? normalized
          .split('')
          .map((c) => c + c)
          .join('')
      : normalized;
  const int = parseInt(full, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

// Parses either a solid `#hex` color or an `rgba(r, g, b, a)` string
// (several dark-theme tokens are translucent, not solid hex).
// Unrecognized input throws rather than silently returning black.
function parseColor(value) {
  if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
    return { ...hexToRgb(value), a: 1 };
  }

  const rgbaMatch = value.match(
    /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/,
  );
  if (rgbaMatch) {
    return {
      r: Number(rgbaMatch[1]),
      g: Number(rgbaMatch[2]),
      b: Number(rgbaMatch[3]),
      a: rgbaMatch[4] !== undefined ? Number(rgbaMatch[4]) : 1,
    };
  }

  throw new Error(`Cannot parse color value: "${value}"`);
}

/** Flattens a translucent color onto an opaque backdrop via alpha compositing. */
function compositeOverBackdrop(fg, backdropValue) {
  if (fg.a >= 1) {
    return { r: fg.r, g: fg.g, b: fg.b };
  }
  const bg = parseColor(backdropValue);
  return {
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
  };
}

function relativeLuminance({ r, g, b }) {
  const linear = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(rgbA, rgbB) {
  const lumA = relativeLuminance(rgbA);
  const lumB = relativeLuminance(rgbB);
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

function main() {
  const manifest = loadManifest();
  const { resolve } = buildResolvers(manifest);

  console.log('GlamUI contrast report\n');

  let anyFailedAA = false;
  let totalPairs = 0;
  let totalPassed = 0;
  const allFailed = [];

  for (const theme of THEMES) {
    console.log(`=== ${theme.name} theme ===\n`);

    // Assumed backdrop for compositing translucent bg values (the feedback washes).
    const backdropHex = resolve(`${theme.prefix}.surface.default`);

    const rows = PAIRS.map((pair) => {
      const fgRaw = resolve(`${theme.prefix}.${pair.fg}`);
      const bgRaw = resolve(`${theme.prefix}.${pair.bg}`);
      const fgRgb = compositeOverBackdrop(parseColor(fgRaw), backdropHex);
      const bgRgb = compositeOverBackdrop(parseColor(bgRaw), backdropHex);
      const ratio = contrastRatio(fgRgb, bgRgb);
      const threshold = THRESHOLDS[pair.kind];
      const passesAA = ratio >= threshold.AA;
      const passesAAA = ratio >= threshold.AAA;
      if (!passesAA) anyFailedAA = true;

      return { ...pair, fgRaw, bgRaw, ratio, passesAA, passesAAA, threshold };
    });

    for (const row of rows) {
      const status = row.passesAAA ? 'AAA' : row.passesAA ? 'AA ' : 'FAIL';
      console.log(
        `[${status}] ${row.ratio.toFixed(2)}:1  ${row.name}\n` +
          `        ${theme.prefix}.${row.fg} (${row.fgRaw}) on ${theme.prefix}.${row.bg} (${row.bgRaw})\n` +
          `        needs ${row.threshold.AA}:1 (${row.kind}) — used in: ${row.usedIn}\n`,
      );
    }

    const failed = rows.filter((r) => !r.passesAA);
    totalPairs += rows.length;
    totalPassed += rows.length - failed.length;
    console.log(
      `${rows.length - failed.length}/${rows.length} pairs pass WCAG AA in the ${theme.name} theme.\n`,
    );
    if (failed.length > 0) {
      allFailed.push(
        ...failed.map((r) => `${r.name} (${theme.name})`),
      );
    }
  }

  console.log(`${totalPassed}/${totalPairs} pairs pass WCAG AA overall.`);
  if (allFailed.length > 0) {
    console.log(`\nFailing pairs: ${allFailed.join(', ')}.`);
  }

  process.exit(anyFailedAA ? 1 : 0);
}

main();
