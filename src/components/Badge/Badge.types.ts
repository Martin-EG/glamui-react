import type { ReactNode } from 'react';

/**
 * Badge types
 * @property {BadgeVariant} variant - The variant of the Badge
 * @property {BadgeSize} size - The size of the Badge
 */

export type BadgeVariant =
  | 'default'
  | 'brand'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export type BadgeSize = 'sm' | 'md';

export interface BadgeProps {
  readonly children?: ReactNode;
  readonly variant?: BadgeVariant;
  readonly size?: BadgeSize;
  /** Renders a small unlabeled dot instead of `children` (e.g. an "unread" marker). */
  readonly dot?: boolean;
  /** When `children` is a number greater than `max`, displays `${max}+` instead. */
  readonly max?: number;
  /**
   * Accessible name announced to screen readers instead of the visible
   * content — e.g. `label="99 plus unread messages"` for a badge showing
   * "99+". Required to make a `dot` badge meaningful on its own; otherwise
   * the dot is treated as decorative and left for surrounding context to
   * describe.
   */
  readonly label?: string;
}
