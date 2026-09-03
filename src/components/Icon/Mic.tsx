import { Icon } from './Icon';
import type { IconProps } from './Icon.types';

export function Mic(props: IconProps) {
  return (
    <Icon {...props}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </Icon>
  );
}