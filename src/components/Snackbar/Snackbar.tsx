'use client';

import { FC, useEffect, useRef } from 'react';

import { Close } from '../Icon';

import {
  ActionButton,
  DismissButton,
  Message,
  StyledSnackbar,
} from './Snackbar.styles';
import { useSnackbarFocusTrap } from './hooks';
import type { SnackbarProps } from './Snackbar.types';

const Snackbar: FC<SnackbarProps> = ({
  message,
  open,
  variant = 'default',
  action,
  dismissible = false,
  dismissAriaLabel = 'Close',
  onClose,
  autoHideDuration,
}) => {
  const snackbarRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useSnackbarFocusTrap({ isOpen: open, panelRef: snackbarRef, onClose });

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open || !autoHideDuration) {
      return;
    }

    const timer = window.setTimeout(
      () => onCloseRef.current?.(),
      autoHideDuration,
    );

    return () => window.clearTimeout(timer);
  }, [open, autoHideDuration]);

  if (!open) return null;

  const isUrgent = variant === 'error';

  return (
    <StyledSnackbar
      $variant={variant}
      ref={snackbarRef}
      role={isUrgent ? 'alert' : 'status'}
      aria-live={isUrgent ? 'assertive' : 'polite'}
      aria-atomic="true"
      tabIndex={-1}
    >
      <Message>{message}</Message>

      {action && (
        <ActionButton type="button" onClick={action.onClick}>
          {action.label}
        </ActionButton>
      )}

      {dismissible && onClose && (
        <DismissButton
          type="button"
          onClick={onClose}
          aria-label={dismissAriaLabel}
        >
          <Close size="sm" />
        </DismissButton>
      )}
    </StyledSnackbar>
  );
};

export default Snackbar;
