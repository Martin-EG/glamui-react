import { palette } from './colors.palette';

export const colors = {
  brand: {
    primary: palette.pink[500],
    secondary: palette.pink[600],
    primaryAlpha: palette.pink.Alpha25,
  },

  text: {
    primary: palette.gray[900],
    secondary: palette.gray[600],
    // gray[500], not gray[400] — gray[400] on white was 2.54:1, failing
    // WCAG AA (needs 4.5:1). gray[500] measures 4.76:1.
    muted: palette.gray[500],

    inverse: palette.white,
    // Pairs with `surface.inverse` (Tooltip); `onBrand` pairs with
    // `brand.primary` (Button, SegmentedControl, DateInput). Different
    // surfaces, different contrast requirements — do not conflate.
    onBrand: palette.gray[900],

    danger: palette.red[700],
    /** @deprecated Unused. Use `colors.feedback.successText` instead. */
    success: palette.green[700],
    /** @deprecated Unused. Use `colors.feedback.warningText` instead. */
    warning: palette.amber[700],
    /** @deprecated Unused. Use `colors.feedback.infoText` instead. */
    info: palette.blue[700],
  },

  border: {
    default: palette.gray[200],
    subtle: palette.gray[100],
    muted: palette.gray[400],

    focus: palette.pink[500],
    /** @deprecated Unused. */
    danger: palette.red[500],
  },

  background: {
    page: palette.white,
    subtle: palette.gray[100],
    muted: palette.gray[200],

    /** @deprecated Unused. Use `colors.feedback.errorBg` instead. */
    danger: palette.red[100],
    /** @deprecated Unused. Use `colors.feedback.successBg` instead. */
    success: palette.green[100],
    /** @deprecated Unused. Use `colors.feedback.warningBg` instead. */
    warning: palette.amber[100],
    /** @deprecated Unused. Use `colors.feedback.infoBg` instead. */
    info: palette.blue[100],
  },

  surface: {
    default: palette.white,
    /** @deprecated Unused. Also the one non-monotonic step in the gray ramp (lighter than gray[200]) — do not reach for it. */
    subtle: palette.gray[300],
    hover: palette.gray[100],
    muted: palette.gray[200],
    // Distinct from `default` in the dark theme (forms/dialogs vs. cards);
    // both are `palette.white` here, so this is a no-op in light.
    elevated: palette.white,
    // Opposite polarity from the rest of the theme — Tooltip's background.
    inverse: palette.gray[900],
    // Same value in both themes: a crop canvas stays black regardless of app theme.
    canvas: '#000000',
  },

  overlay: {
    scrim: 'rgba(0, 0, 0, 0.45)',
    loading: 'rgba(255, 255, 255, 0.78)',
  },

  feedback: {
    errorBg: palette.red[100],
    errorText: palette.red[700],
    successBg: palette.green[100],
    successText: palette.green[700],
    warningBg: palette.amber[100],
    warningText: palette.amber[700],
    infoBg: palette.blue[100],
    infoText: palette.blue[700],
  },
};
