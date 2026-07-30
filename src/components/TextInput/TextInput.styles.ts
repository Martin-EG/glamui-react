import { styled } from 'styled-components';

interface WrapperProps {
  $hasError: boolean;
  $disabled: boolean;
}

export const FieldWrapper = styled.div<WrapperProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.opacity.disabled : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const Input = styled.input<WrapperProps>`
  line-height: 1;
  box-sizing: border-box;
  height: ${({ theme }) => theme.size.field};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};

  background: ${({ theme }) => theme.colors.surface.elevated};
  color: ${({ theme }) => theme.colors.text.primary};

  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.feedback.errorText : theme.colors.text.muted};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.secondary};
    box-shadow: 0 0 0 ${({ theme }) => theme.focus.ring.width}
      ${({ theme }) => theme.colors.brand.primaryAlpha};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  color: ${({ theme }) => theme.colors.feedback.errorText};
`;
