'use client';

import { FC } from 'react';

import { StyledBadge, VisuallyHidden } from './Badge.styles';
import type { BadgeProps } from './Badge.types';

const Badge: FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  max,
  label,
}) => {
  if (dot) {
    return (
      <StyledBadge
        $variant={variant}
        $size={size}
        $dot
        role={label ? 'status' : undefined}
        aria-label={label}
        aria-hidden={label ? undefined : true}
      />
    );
  }

  const content =
    typeof children === 'number' && typeof max === 'number' && children > max
      ? `${max}+`
      : children;

  return (
    <StyledBadge $variant={variant} $size={size} role="status">
      <span aria-hidden={label ? true : undefined}>{content}</span>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </StyledBadge>
  );
};

export default Badge;
