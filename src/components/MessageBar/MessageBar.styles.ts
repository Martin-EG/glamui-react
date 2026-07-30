import { styled, keyframes } from 'styled-components';

import type { MessageBarVariant } from './MessageBar.types';

interface StyledMessageBarProps {
  readonly $variant: MessageBarVariant;
}

const slideFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledMessageBar = styled.div.attrs<StyledMessageBarProps>(
  ({ $variant }) => ({
    className: `message-bar message-bar-${$variant}`,
    role: 'alert',
  }),
)<StyledMessageBarProps>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm};
  margin: ${({ theme }) => theme.spacing.xs} 0;
  border-radius: ${({ theme }) => theme.radius.sm};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};

  animation: ${slideFadeIn}
    var(--motion-duration-moderate, ${({ theme }) => theme.motion.duration.moderate})
    var(--motion-easing-decelerate, ${({ theme }) => theme.motion.easing.decelerate});

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.feedback.errorText};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
  }

  &.message-bar-error {
    background: ${({ theme }) => theme.colors.feedback.errorBg};
  }

  &.message-bar-success {
    background: ${({ theme }) => theme.colors.feedback.successBg};
  }

  &.message-bar-warning {
    background: ${({ theme }) => theme.colors.feedback.warningBg};
  }

  &.message-bar-info {
    background: ${({ theme }) => theme.colors.feedback.infoBg};
  }
`;
