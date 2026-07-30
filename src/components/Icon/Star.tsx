import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Star(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 3l2.9 5.88L21 9.76l-4.5 4.38L17.8 21 12 17.9 6.2 21l1.3-6.86L3 9.76l6.1-.88L12 3z" />
    </Icon>
  );
}
