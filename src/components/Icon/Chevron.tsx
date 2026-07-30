import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Chevron(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 9l6 6 6-6" />
    </Icon>
  );
}
