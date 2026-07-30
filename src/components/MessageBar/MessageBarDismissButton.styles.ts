import { styled } from 'styled-components';

import type { MessageBarVariant } from './MessageBar.types';

interface StyledMessageBarDismissButtonProps {
  readonly $variant: MessageBarVariant;
}

export const MessageBarDismissButton = styled.button.attrs<StyledMessageBarDismissButtonProps>(
  ({ $variant }) => ({
    className: `message-bar-dismiss-btn message-bar-dismiss-btn-${$variant}`,
    type: 'button',
    'aria-label': 'Dismiss message',
  }),
)<StyledMessageBarDismissButtonProps>`
  background: transparent;
  border: none;
  padding: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  line-height: 1;

  &:hover {
    transform: scale(1.2);
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid currentColor;
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  &.message-bar-dismiss-btn-error {
    color: ${({ theme }) => theme.colors.feedback.errorText};
  }

  &.message-bar-dismiss-btn-success {
    color: ${({ theme }) => theme.colors.feedback.successText};
  }

  &.message-bar-dismiss-btn-warning {
    color: ${({ theme }) => theme.colors.feedback.warningText};
  }

  &.message-bar-dismiss-btn-info {
    color: ${({ theme }) => theme.colors.feedback.infoText};
  }
`;
