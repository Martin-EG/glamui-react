import { styled } from 'styled-components';
import type { ButtonVariant, ButtonSize, ButtonRounded } from './Button.types';

interface StyledButtonProps {
  readonly $variant: ButtonVariant;
  readonly $size: ButtonSize;
  readonly $rounded: ButtonRounded;
  readonly $fullSize?: boolean;
  readonly disabled?: boolean;
  readonly $iconPosition?: 'start' | 'end';
}

export const StyledButton = styled('button').attrs<StyledButtonProps>(
  ({ $variant, $size, $rounded, disabled }) => ({
    className: `btn btn-${$variant} btn-${$size} btn-${$rounded} ${disabled ? 'btn-disabled' : ''}`,
    disabled: disabled,
  }),
)<StyledButtonProps>`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  flex-direction: ${({ $iconPosition }) =>
    $iconPosition === 'end' ? 'row-reverse' : undefined};
  column-gap: ${({ theme }) => theme.spacing.sm};
  row-gap: ${({ theme }) => theme.spacing.xs};
  align-items: center;
  justify-content: center;
  border: none;
  transition:
    background
      var(--motion-duration-slow, ${({ theme }) => theme.motion.duration.slow})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard}),
    transform
      var(--motion-duration-instant, ${({ theme }) => theme.motion.duration.instant})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard});
  border-radius: ${({ theme }) => theme.radius.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  width: ${({ $fullSize }) => ($fullSize ? '100%' : 'auto')};

  &:active {
    transform: scale(0.98);
  }

  /* Variants */
  &.btn-primary {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.text.onBrand};
  }

  &.btn-secondary {
    border: 1.5px solid ${({ theme }) => theme.colors.brand.primary};
    background: transparent;
  }

  &.btn-outline {
    border: 1.5px solid ${({ theme }) => theme.colors.border.default};
    background: ${({ theme }) => theme.colors.background.page};
  }

  &.btn-danger {
    background: ${({ theme }) => theme.colors.feedback.errorBg};
    color: ${({ theme }) => theme.colors.feedback.errorText};
  }

  &.btn-transparent {
    background: transparent;
  }

  &.btn-disabled {
    opacity: ${({ theme }) => theme.opacity.disabledButton};
    cursor: not-allowed;
  }

  /* Sizes */
  &.btn-xs {
    height: 36px;
    padding: 0 ${({ theme }) => theme.spacing.sm};
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  &.btn-sm {
    height: 40px;
    padding: 0 ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  &.btn-md {
    height: 44px;
    padding: 0 ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }

  &.btn-lg {
    height: 48px;
    padding: 0 ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  /* Rounded */
  &.btn-full {
    border-radius: ${({ theme }) => theme.radius.xl};
  }

  &.btn-semi {
    border-radius: ${({ theme }) => theme.radius.lg};
  }
`;
