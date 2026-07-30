import type { HTMLAttributes } from 'react';

export interface ClickableProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  onClick: () => void;
  disabled?: boolean;
}
