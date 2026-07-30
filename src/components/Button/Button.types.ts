import { ButtonHTMLAttributes, ReactNode } from 'react';

/***
 * Button types
 * @property {ButtonVariant} variant - The variant of the button
 * @property {ButtonSize} size - The size of the button
 * @property {ButtonRounded} rounded - The rounded of the button
 */
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'outline'
  | 'transparent';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
export type ButtonRounded = 'full' | 'semi';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly rounded?: ButtonRounded;
  readonly fullSize?: boolean;
  readonly icon?: ReactNode;
  readonly iconPosition?: 'start' | 'end';
}
