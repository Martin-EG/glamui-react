/**
 * The stacking order, named rather than raw. `dropdown`/`modal` are
 * deliberately equal — Menu and Modal never appear as parent/child
 * today. `toast` sits above `modal`/`popover` since a Snackbar can be
 * triggered by an action taken inside either and must stay visible over
 * them. `tooltip` sits above everything since it must render over any
 * other floating content it appears inside of.
 */
export const zIndex = {
  dropdown: 1000,
  modal: 1000,
  popover: 1100,
  toast: 1150,
  tooltip: 1200,
} as const;
