'use client';

import { FC, PropsWithChildren } from 'react';

import Text from '../Text';
import Button from '../Button';
import IconButton from '../IconButton';
import { Close } from '../Icon';

import { Footer, Header, ModalBase, ModalBody, Overlay } from './Modal.styles';

export interface ModalProps extends PropsWithChildren {
  readonly title?: string;
  readonly cancelText?: string;
  readonly confirmText?: string;
  readonly confirmLoading?: boolean;
  readonly confirmLoadingLabel?: string;
  readonly confirmDisabled?: boolean;
  readonly closeLabel?: string;
  readonly onCancel?: () => void;
  readonly onClose?: () => void;
  readonly onConfirm?: () => void | Promise<void>;
}

const Modal: FC<ModalProps> = ({
  title,
  cancelText,
  confirmText,
  confirmLoading = false,
  confirmLoadingLabel,
  confirmDisabled = false,
  closeLabel,
  onCancel,
  onClose,
  onConfirm,
  children,
}) => {
  const headerTitle = title ? (
    <Text
      variant="heading"
      as="h2"
      size="lg"
      weight="bold"
      color="default"
      truncate={false}
      align="left"
      labelFor={title}
    >
      {title}
    </Text>
  ) : null;

  const headerCloseButton = onClose ? (
    <IconButton
      type="button"
      icon={<Close size="md" />}
      label={closeLabel ?? 'Cancel'}
      onClick={onClose}
    />
  ) : null;
  const modalHeader =
    title || onClose ? (
      <Header>
        {headerTitle}
        {headerCloseButton}
      </Header>
    ) : null;

  const secondaryButtonText =
    !!onCancel && !!cancelText ? cancelText : 'Cancel';
  const primaryButtonText = !!confirmText ? confirmText : 'Save';
  const primaryButtonLabel =
    confirmLoading && confirmLoadingLabel
      ? confirmLoadingLabel
      : primaryButtonText;
  const loadingSpinner = confirmLoading ? (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        border: '2px solid currentColor',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'glamvault-modal-confirm-spin 0.8s linear infinite',
      }}
    />
  ) : null;

  const primaryButton = onConfirm ? (
    <Button
      type="button"
      onClick={onConfirm}
      aria-label={primaryButtonLabel}
      disabled={confirmLoading || confirmDisabled}
      size="sm"
      fullSize
    >
      {loadingSpinner}
      {primaryButtonText}
    </Button>
  ) : null;

  const secondaryButton = onCancel ? (
    <Button
      type="button"
      variant="secondary"
      onClick={onCancel}
      aria-label={secondaryButtonText}
      size="sm"
      fullSize
    >
      {secondaryButtonText}
    </Button>
  ) : null;

  return (
    <Overlay>
      <ModalBase role="dialog" aria-modal="true">
        {modalHeader}

        <ModalBody>{children}</ModalBody>

        <Footer>
          {secondaryButton}
          {primaryButton}
        </Footer>
      </ModalBase>
      <style>
        {`@keyframes glamvault-modal-confirm-spin { to { transform: rotate(360deg); } }`}
      </style>
    </Overlay>
  );
};

export default Modal;
