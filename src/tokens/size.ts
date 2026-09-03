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
  // The compact-control height scale: was hardcoded separately in Button
  // (as 4 unreferenced literals) and Searchbar (as a 5th, duplicating
  // Button's `xs`) — named here so both, and any future control that
  // needs the same scale, reference one value instead of re-guessing it.
  control: {
    xs: '36px',
    sm: '40px',
    md: '44px',
    lg: '48px',
  },
} as const;
