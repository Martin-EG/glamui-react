export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const iconSizes: Record<IconSize, number> = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 28,
};

export interface IconProps {
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  className?: string;
  title?: string;
}
