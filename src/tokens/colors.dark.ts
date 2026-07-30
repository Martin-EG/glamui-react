import { darkPalette } from './colors.palette.dark';

/**
 * Mirrors the exact key shape of `colors.ts` so the two themes stay
 * interchangeable. `brand.primary` is Glam Pink, scoped to dark mode
 * only by decision — the light theme's brand pink is unchanged.
 */
export const colorsDark = {
  brand: {
    primary: darkPalette.pink.glam,
    secondary: darkPalette.pink.rose,
    primaryAlpha: 'rgba(255, 45, 161, 0.25)',
  },

  text: {
    primary: darkPalette.text.primary,
    secondary: darkPalette.text.secondary,
    muted: darkPalette.text.muted,

    inverse: darkPalette.neutral.midnight,
    onBrand: darkPalette.neutral.midnight,

    danger: darkPalette.coral,
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    success: darkPalette.mint,
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    warning: darkPalette.peach,
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    info: darkPalette.lavender,
  },

  border: {
    default: darkPalette.neutral.borderSubtle,
    subtle: darkPalette.neutral.borderSubtle,
    muted: darkPalette.neutral.borderStrong,

    focus: darkPalette.pink.glam,
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    danger: darkPalette.coral,
  },

  background: {
    page: darkPalette.neutral.midnight,
    subtle: darkPalette.neutral.graphite,
    muted: darkPalette.neutral.slate,

    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    danger: 'rgba(255, 93, 115, 0.12)',
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    success: 'rgba(70, 211, 154, 0.12)',
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    warning: 'rgba(255, 184, 107, 0.12)',
    /** @deprecated Unused in the light theme this mirrors. Mapped for shape parity only. */
    info: 'rgba(185, 140, 255, 0.12)',
  },

  surface: {
    default: darkPalette.neutral.graphite,
    subtle: darkPalette.neutral.graphite,
    hover: darkPalette.neutral.slate,
    muted: darkPalette.neutral.borderSubtle,
    elevated: darkPalette.neutral.slate,
    inverse: darkPalette.text.primary,
    canvas: '#000000',
  },

  overlay: {
    scrim: 'rgba(0, 0, 0, 0.45)',
    loading: 'rgba(17, 19, 26, 0.78)',
  },

  feedback: {
    // 12% opacity washes over Graphite — verified via check:contrast;
    // 16% left error text too close to the 4.5:1 AA floor (4.56:1).
    errorBg: 'rgba(255, 93, 115, 0.12)',
    errorText: darkPalette.coral,
    successBg: 'rgba(70, 211, 154, 0.12)',
    successText: darkPalette.mint,
    warningBg: 'rgba(255, 184, 107, 0.12)',
    warningText: darkPalette.peach,
    infoBg: 'rgba(185, 140, 255, 0.12)',
    infoText: darkPalette.lavender,
  },
};
