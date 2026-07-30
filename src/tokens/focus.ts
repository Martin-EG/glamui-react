/**
 * Focus geometry only — never a color. Components compose their own
 * glow from `ring.width` plus `colors.brand.primaryAlpha`, kept
 * theme-aware rather than baked into a fixed string here.
 */
export const focus = {
  ring: {
    width: '2px',
    offset: '2px',
  },
} as const;
