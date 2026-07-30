'use client';

import { FC, useId } from 'react';

import Label from '../Label';
import { ErrorText } from '../TextInput/TextInput.styles';

import {
  Chevron,
  FieldWrapper,
  SelectShell,
  StyledSelect,
} from './Select.styles';
import type { SelectProps } from './Select.types';

const Select: FC<SelectProps> = ({
  label,
  error,
  options,
  placeholder,
  id,
  disabled,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = error ? `${selectId}-error` : undefined;
  const errorText = !!error ? (
    <ErrorText id={errorId} role="alert">
      {error}
    </ErrorText>
  ) : null;

  const labelText = !!label ? (
    <Label htmlFor={selectId} text={label}></Label>
  ) : null;

  const placeholderOption = !!placeholder ? (
    <option value="" disabled>
      {placeholder}
    </option>
  ) : null;

  const optionsMap = options.map((option) => (
    <option key={option.value} value={option.value} disabled={option.disabled}>
      {option.label}
    </option>
  ));

  return (
    <FieldWrapper $hasError={!!error} $disabled={!!disabled}>
      {labelText}

      <SelectShell>
        <StyledSelect
          id={selectId}
          $hasError={!!error}
          $disabled={!!disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          disabled={disabled}
          {...props}
        >
          {placeholderOption}
          {optionsMap}
        </StyledSelect>
        <Chevron $hasError={!!error} $disabled={!!disabled} />
      </SelectShell>

      {errorText}
    </FieldWrapper>
  );
};

export default Select;
