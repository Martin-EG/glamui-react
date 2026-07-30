/**
 * Sizes that recur across otherwise-unrelated components. Named for
 * what they are, not for where they're used.
 */
export const size = {
  field: '35px',
  calendarDay: '28px',
  iconSlot: '32px',
  minTouchTarget: '44px',
  // Shared by Avatar and ProgressRing.
  circle: {
    sm: '40px',
    md: '72px',
    lg: '120px',
  },
} as const;
