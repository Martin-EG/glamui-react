import { styled } from 'styled-components';

import type { BadgeSize, BadgeVariant } from './Badge.types';

interface StyledBadgeProps {
  readonly $variant: BadgeVariant;
  readonly $size: BadgeSize;
  readonly $dot?: boolean;
}

const DOT_DIAMETER: Record<BadgeSize, string> = {
  sm: '8px',
  md: '10px',
};

const TEXT_MIN_SIZE: Record<BadgeSize, string> = {
  sm: '16px',
  md: '20px',
};

export const StyledBadge = styled.span.attrs<StyledBadgeProps>(
  ({ $variant }) => ({
    className: `badge badge-${$variant}`,
  }),
)<StyledBadgeProps>`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border-radius: ${({ $dot, theme }) => ($dot ? '50%' : theme.radius.xl)};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  white-space: nowrap;

  width: ${({ $dot, $size }) => ($dot ? DOT_DIAMETER[$size] : 'auto')};
  height: ${({ $dot, $size }) => ($dot ? DOT_DIAMETER[$size] : TEXT_MIN_SIZE[$size])};
  min-width: ${({ $dot, $size }) => ($dot ? DOT_DIAMETER[$size] : TEXT_MIN_SIZE[$size])};
  padding: ${({ $dot, theme }) => ($dot ? '0' : `0 ${theme.spacing.xs}`)};

  /* Variants — background/text pairs mirror MessageBar's feedback tokens,
     already verified at WCAG AA (see tokens/colors.ts, colors.dark.ts). */
  &.badge-default {
    background: ${({ theme }) => theme.colors.surface.muted};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &.badge-brand {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.text.onBrand};
  }

  &.badge-success {
    background: ${({ theme }) => theme.colors.feedback.successBg};
    color: ${({ theme }) => theme.colors.feedback.successText};
  }

  &.badge-warning {
    background: ${({ theme }) => theme.colors.feedback.warningBg};
    color: ${({ theme }) => theme.colors.feedback.warningText};
  }

  &.badge-error {
    background: ${({ theme }) => theme.colors.feedback.errorBg};
    color: ${({ theme }) => theme.colors.feedback.errorText};
  }

  &.badge-info {
    background: ${({ theme }) => theme.colors.feedback.infoBg};
    color: ${({ theme }) => theme.colors.feedback.infoText};
  }
`;

export const VisuallyHidden = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;
