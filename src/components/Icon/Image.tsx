import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Image(props: IconProps) {
  const { color = 'currentColor' } = props;
  return (
    <Icon {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 15l5-5 4 4 5-5 4 4" />
      <circle cx="9" cy="9" r="1.5" fill={color} stroke="none" />
    </Icon>
  );
}
