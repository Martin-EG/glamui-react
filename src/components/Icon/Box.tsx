import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Box(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 7l9 5 9-5M3 7l9-4 9 4M3 7v10l9 5 9-5V7" />
    </Icon>
  );
}
