import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Exit(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <path d="M10 17l5-5-5-5M15 12H3" />
    </Icon>
  );
}
