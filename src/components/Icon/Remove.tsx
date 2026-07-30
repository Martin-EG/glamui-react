import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Remove(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14" />
    </Icon>
  );
}
