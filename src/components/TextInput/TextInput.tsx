'use client';

import { FC } from 'react';

import Label from '../Label';

import { FieldWrapper, Input, ErrorText } from './TextInput.styles';
import type { TextInputProps } from './TextInput.types';

const TextInput: FC<TextInputProps> = ({
  label,
  error,
  variant = 'text',
  id,
  disabled,
  ...props
}) => {
  const ariaDescribedBy = error ? `${id}-error` : undefined;

  const errorText = !!error ? (
    <ErrorText id={ariaDescribedBy}>{error}</ErrorText>
  ) : null;

  const labelText = !!label ? <Label htmlFor={id} text={label} /> : null;

  return (
    <FieldWrapper $hasError={!!error} $disabled={!!disabled}>
      {labelText}

      <Input
        id={id}
        type={variant}
        $hasError={!!error}
        $disabled={!!disabled}
        aria-invalid={!!error}
        aria-describedby={ariaDescribedBy}
        disabled={disabled}
        {...props}
      />

      {errorText}
    </FieldWrapper>
  );
};

export default TextInput;
