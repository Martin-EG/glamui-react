import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Heart(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20.8 5.6a5.5 5.5 0 00-7.8 0L12 6.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 22l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
    </Icon>
  );
}
