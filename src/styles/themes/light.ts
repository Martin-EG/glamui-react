import { colors } from '../../tokens/colors';
import { spacing } from '../../tokens/spacing';
import { typography } from '../../tokens/typography';
import { radius } from '../../tokens/radius';
import { shadows } from '../../tokens/shadows';
import { motion } from '../../tokens/motion';
import { opacity } from '../../tokens/opacity';
import { zIndex } from '../../tokens/zIndex';
import { focus } from '../../tokens/focus';
import { size } from '../../tokens/size';
import { effects } from '../../tokens/effects';
import { breakpoints } from '../breakpoints';

export const lightTheme = {
  fonts: {
    primary: 'var(--font-nunito), system-ui, sans-serif',
    mono: "'Menlo', 'Consolas', monospace",
  },
  colors,
  spacing,
  typography,
  radius,
  shadows,
  breakpoints,
  motion,
  opacity,
  zIndex,
  focus,
  size,
  effects,
};
