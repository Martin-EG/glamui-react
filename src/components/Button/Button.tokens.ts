import type { AppTheme } from '../../styles/theme';

import type { ButtonSize } from './Button.types';

/**
 * Button's own component tokens (see docs/TOKEN_ARCHITECTURE.md, Layer 2).
 * Each entry resolves to a semantic token — never a raw literal — so
 * Button's per-size scale has one named source instead of four
 * independently-typed literals.
 */
export const buttonTokens = {
  height: (theme: AppTheme, size: ButtonSize): string => theme.size.control[size],
};
