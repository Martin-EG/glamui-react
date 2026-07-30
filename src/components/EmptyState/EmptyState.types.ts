import type { ReactNode } from 'react';

export interface EmptyStateProps {
  /** Decorative illustration or icon. Rendered `aria-hidden` — never the sole
   * carrier of meaning, since the title already says what's empty. */
  readonly icon?: ReactNode;
  /** What's empty and why, in a few words. The only required content. */
  readonly title: string;
  /** Optional elaboration — what to do about it, or why it's empty. */
  readonly description?: string;
  /** A single action, usually a `Button`. Rendered as-is, not wrapped in a
   * second interactive element. */
  readonly action?: ReactNode;
}
