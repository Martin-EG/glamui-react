import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function EyeOff(props: IconProps) {
  return (
    <Icon strokeWidth={2} {...props}>
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.7 21.7 0 0 1 5.06-6.94" />
      <path d="M1 1l22 22" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.7 21.7 0 0 1-4.87 6.33" />
      <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
    </Icon>
  );
}
