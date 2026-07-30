/**
 * Avatar types
 * Add your types here like:
 * @property {AvatarSize} size - The size of the Avatar
 */

export type AvatarSize = 'sm' | 'md' | 'lg';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  editable?: boolean;
  loading?: boolean;
  onClick?: () => void;
  editAriaLabel?: string;
}
