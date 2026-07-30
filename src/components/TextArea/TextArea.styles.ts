import { styled } from 'styled-components';
import type { TextAreaResize } from './TextArea.types';

interface FieldStateProps {
  $hasError: boolean;
  $disabled: boolean;
}

interface StyledTextAreaProps extends FieldStateProps {
  $resize: TextAreaResize;
}

export const FieldWrapper = styled.div<FieldStateProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.opacity.disabled : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const StyledTextArea = styled.textarea<StyledTextAreaProps>`
  box-sizing: border-box;
  width: 100%;
  min-height: 96px;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1.4;
  resize: ${({ $resize }) => $resize};

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
