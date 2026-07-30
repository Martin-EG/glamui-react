'use client';

import { FC, useId } from 'react';

import Label from '../Label';
import { ErrorText } from '../TextInput/TextInput.styles';

import { FieldWrapper, StyledTextArea } from './TextArea.styles';
import type { TextAreaProps } from './TextArea.types';

const TextArea: FC<TextAreaProps> = ({
  label,
  error,
  id,
  disabled,
  resize = 'vertical',
  ...props
}) => {
  const generatedId = useId();
  const textAreaId = id ?? generatedId;
  const errorId = error ? `${textAreaId}-error` : undefined;

  const errorText = !!error ? (
    <ErrorText id={errorId} role="alert">
      {error}
    </ErrorText>
  ) : null;

  const labelText = !!label ? (
    <Label text={label} htmlFor={textAreaId} />
  ) : null;

  return (
    <FieldWrapper $hasError={!!error} $disabled={!!disabled}>
      {labelText}

      <StyledTextArea
        id={textAreaId}
        $hasError={!!error}
        $disabled={!!disabled}
        $resize={resize}
        aria-invalid={!!error}
        aria-describedby={errorId}
        disabled={disabled}
        {...props}
      />

      {errorText}
    </FieldWrapper>
  );
};

export default TextArea;
