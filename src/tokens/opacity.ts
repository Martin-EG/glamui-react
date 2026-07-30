/**
 * Named opacity values for recurring interaction states. These are not a
 * numeric scale — each name captures one specific state already observed
 * across the component library, so the same decimal isn't hand-typed in
 * a new component the next time this state comes up.
 */
export const opacity = {
  disabled: 0.6,
  disabledButton: 0.5,
  caption: 0.75,
  decorative: 0.7,
  disabledDay: 0.45,
} as const;
