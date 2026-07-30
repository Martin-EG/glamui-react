/***
 * Text types
 * @property {TextVariant} variant - The variant of the text
 * @property {TextSize} size - The size of the text
 * @property {TextWeight} weight - The weight of the text
 * @property {TextAs} as - The html element to render the text as
 * @property {TextColor} color - The color of the text
 * @property {TextTruncate} truncate - The truncate of the text
 * @property {TextAlign} align - The alignment of the text
 */

export type TextVariant =
  | 'body'
  | 'caption'
  | 'label'
  | 'heading'
  | 'subheading';

export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export type TextWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type TextAs = 'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4';

export type TextColor =
  | 'default'
  | 'light'
  | 'muted'
  | 'brand'
  | 'brandSecondary'
  | 'danger'
  | 'error'
  | 'success'
  | 'warning'
  | 'info';

export type TextTruncate = boolean | number;

export type TextAlign = 'left' | 'center' | 'right' | 'justify';
