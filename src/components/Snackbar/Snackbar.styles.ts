import { styled, keyframes } from 'styled-components';

import type { SnackbarVariant } from './Snackbar.types';

interface StyledSnackbarProps {
  readonly $variant: SnackbarVariant;
}

const slideUpFadeIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const StyledSnackbar = styled.div.attrs<StyledSnackbarProps>(
  ({ $variant }) => ({
    className: `snackbar snackbar-${$variant}`,
  }),
)<StyledSnackbarProps>`
  position: fixed;
  left: 50%;
  bottom: ${({ theme }) => theme.spacing.xl};
  transform: translate(-50%, 0);
  z-index: ${({ theme }) => theme.zIndex.toast};

  box-sizing: border-box;
  max-width: calc(100vw - ${({ theme }) => theme.spacing.xl} * 2);
  width: max-content;
  min-height: ${({ theme }) => theme.size.minTouchTarget};

  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  border-left: 4px solid transparent;

  background: ${({ theme }) => theme.colors.surface.inverse};
  box-shadow: ${({ theme }) => theme.shadows.md};

  animation: ${slideUpFadeIn}
    var(--motion-duration-moderate, ${({ theme }) => theme.motion.duration.moderate})
    var(--motion-easing-decelerate, ${({ theme }) => theme.motion.easing.decelerate});

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.text.inverse};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
  }

  /* Decorative accent only — message text always uses the verified
     surface.inverse / text.inverse pairing below, so variant identity
     never depends on an unverified color-on-dark-surface contrast. */
  &.snackbar-success {
    border-left-color: ${({ theme }) => theme.colors.feedback.successText};
  }

  &.snackbar-warning {
    border-left-color: ${({ theme }) => theme.colors.feedback.warningText};
  }

  &.snackbar-error {
    border-left-color: ${({ theme }) => theme.colors.feedback.errorText};
  }

  &.snackbar-info {
    border-left-color: ${({ theme }) => theme.colors.feedback.infoText};
  }
`;

export const Message = styled.span`
  flex: 1;
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  line-height: ${({ theme }) => theme.typography.lineHeights.normal};
`;

export const ActionButton = styled.button`
  flex-shrink: 0;
  min-height: ${({ theme }) => theme.size.minTouchTarget};
  padding: 0 ${({ theme }) => theme.spacing.sm};
  border: none;
  background: transparent;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  text-transform: uppercase;
  letter-spacing: 0.02em;

  &:hover {
    text-decoration: underline;
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.text.inverse};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export const DismissButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme }) => theme.size.minTouchTarget};
  height: ${({ theme }) => theme.size.minTouchTarget};
  margin: 0 -${({ theme }) => theme.spacing.sm};

  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.inverse};

  &:hover {
    opacity: ${({ theme }) => theme.opacity.decorative};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.text.inverse};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
