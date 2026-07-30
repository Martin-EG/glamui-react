import type { ReactElement, ReactNode } from 'react';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** The tooltip's content. */
  readonly label: ReactNode;
  /** A single element that triggers the tooltip on hover or keyboard focus. */
  readonly children: ReactElement;
  readonly placement?: TooltipPlacement;
}
