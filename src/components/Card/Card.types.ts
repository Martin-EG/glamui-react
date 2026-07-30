import { ReactNode } from 'react';

import type { MenuItem } from '../Menu/Menu.types';

/**
 * Card types
 * @property {CardSize} size - The size of the Card
 *
 */

export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  readonly title: string;
  readonly image?: string;
  readonly body: ReactNode;
  readonly footer?: ReactNode;
  readonly size?: CardSize;
  readonly options?: MenuItem[];
}
