import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Sparkle(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M12 2.5l1.8 5.2 5.2 1.8-5.2 1.8L12 16.5l-1.8-5.2L5 9.5l5.2-1.8L12 2.5z" />
      <path d="M19 14l.9 2.6L22.5 17.5l-2.6.9L19 21l-.9-2.6-2.6-.9 2.6-.9L19 14z" />
    </Icon>
  );
}
