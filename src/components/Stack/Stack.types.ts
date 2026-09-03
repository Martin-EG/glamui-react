import type { HTMLAttributes } from 'react';

/***
 * Stack types
 * @property {StackAs} as - The html element to render the stack as
 * @property {StackDirection} direction - The flex direction of the stack
 * @property {StackGap} gap - The gap between stack children
 * @property {StackAlign} align - The cross-axis alignment of stack children
 * @property {StackJustify} justify - The main-axis alignment of stack children
 * @property {boolean} wrap - Whether stack children may wrap onto new lines
 */

export type StackAs = 'div' | 'form' | 'section';

export type StackDirection = 'row' | 'column';

export type StackGap = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

export type StackJustify = 'start' | 'center' | 'end' | 'between';

export interface StackProps extends HTMLAttributes<HTMLElement> {
  readonly as?: StackAs;
  readonly direction?: StackDirection;
  readonly gap?: StackGap;
  readonly align?: StackAlign;
  readonly justify?: StackJustify;
  readonly wrap?: boolean;
}
