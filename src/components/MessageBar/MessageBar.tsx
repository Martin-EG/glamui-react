'use client';

import { FC, useEffect, useRef } from 'react';

import Text from '../Text';

import { StyledMessageBar } from './MessageBar.styles';
import type { MessageBarVariant } from './MessageBar.types';
import { MessageBarDismissButton } from './MessageBarDismissButton.styles';

export interface MessageBarProps {
  readonly message: string | undefined;
  readonly variant?: MessageBarVariant;
  readonly dismissible?: boolean;
  readonly dismissMessageBar?: () => void;
  readonly dismissAriaLabel?: string;
}

const MessageBar: FC<MessageBarProps> = ({
  message,
  variant = 'error',
  dismissible = false,
  dismissMessageBar,
  dismissAriaLabel = 'Close',
}) => {
  const messageBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && variant === 'error' && messageBarRef.current) {
      messageBarRef.current.focus();
    }
  }, [message, variant, messageBarRef]);

  if (!message) return null;

  const messageBarFocusProps = variant === 'error' ? { tabIndex: -1 } : {};

  return (
    <StyledMessageBar
      $variant={variant}
      ref={messageBarRef}
      {...messageBarFocusProps}
    >
      <Text as="span" size="sm" weight="medium" color={variant}>
        {message}
      </Text>

      {dismissible && (
        <MessageBarDismissButton
          $variant={variant}
          onClick={dismissMessageBar}
          aria-label={dismissAriaLabel}
        >
          ×
        </MessageBarDismissButton>
      )}
    </StyledMessageBar>
  );
};

export default MessageBar;
