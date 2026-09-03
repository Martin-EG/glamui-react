import { colorsDark } from '../../tokens/colors.dark';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { shadowsDark } from '../../tokens/shadows.dark';
import { motion } from '../../tokens/motion';
import { opacity } from '../../tokens/opacity';
import { zIndex } from '../../tokens/zIndex';
import { focus } from '../../tokens/focus';
import { size } from '../../tokens/size';
import { effects } from '../../tokens/effects';
import { breakpoints } from '../breakpoints';

// Only `colors` and `shadows` differ from `lightTheme` — everything
// else is behavioral/structural, not a color decision.
export const darkTheme = {
  fonts: {
    primary: 'var(--font-nunito), system-ui, sans-serif',
    mono: "'Menlo', 'Consolas', monospace",
  },
  colors: colorsDark,
  spacing,
  typography,
  radius,
  shadows: shadowsDark,
  breakpoints,
  motion,
  opacity,
  zIndex,
  focus,
  size,
  effects,
};
