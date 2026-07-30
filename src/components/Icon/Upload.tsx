import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Upload(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 16V4M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </Icon>
  );
}
