import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Close(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M18 6L6 18" />
      <path d="M6 6L18 18" />
    </Icon>
  );
}
