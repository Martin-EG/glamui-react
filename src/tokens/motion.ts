/**
 * Motion primitives. Every component transition or animation should
 * reference a duration and an easing curve from here rather than typing
 * a raw millisecond value — that repetition is exactly what let more than
 * a dozen independently-chosen durations accumulate across the library.
 */
export const motion = {
  duration: {
    instant: '100ms',
    fast: '120ms',
    base: '160ms',
    moderate: '180ms',
    slow: '200ms',
    shimmer: '1.4s',
  },
  easing: {
    standard: 'ease',
    decelerate: 'ease-out',
  },
} as const;
