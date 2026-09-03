import type { HTMLAttributes } from 'react';

/***
 * Box types
 * @property {BoxAs} as - The html element to render the box as
 * @property {BoxPadding} padding - The padding of the box
 * @property {BoxRadius} radius - The border radius of the box
 * @property {BoxBackground} background - The background surface of the box
 * @property {boolean} border - Whether the box has a 1px default border
 */

export type BoxAs = 'div' | 'section' | 'article';

export type BoxPadding = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BoxRadius = 'sm' | 'md' | 'lg' | 'xl';

export type BoxBackground = 'default' | 'subtle' | 'muted' | 'elevated';

export interface BoxProps extends HTMLAttributes<HTMLElement> {
  readonly as?: BoxAs;
  readonly padding?: BoxPadding;
  readonly radius?: BoxRadius;
  readonly background?: BoxBackground;
  readonly border?: boolean;
}
