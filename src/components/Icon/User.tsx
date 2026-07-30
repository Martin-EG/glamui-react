import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function User(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 21c0-3.314-3.582-6-8-6s-8 2.686-8 6" />
      <circle cx="12" cy="7" r="4" />
    </Icon>
  );
}
