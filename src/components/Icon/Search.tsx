import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Search(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20L16.5 16.5" />
    </Icon>
  );
}
