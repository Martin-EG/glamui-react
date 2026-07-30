'use client';

import { FC, useState } from 'react';

import { Eye, EyeOff } from '../Icon';
import TextInput from '../TextInput';
import type { TextInputProps } from '../TextInput';

import { PasswordWrapper, ToggleButton } from './PasswordInput.styles';

export interface PasswordInputProps extends Omit<
  TextInputProps,
  'variant' | 'type'
> {
  showLabel?: string;
  hideLabel?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  showLabel,
  hideLabel,
  error,
  ...props
}) => {
  const displayShowLabel = showLabel || 'Show password';
  const displayHideLabel = hideLabel || 'Hide password';
  const [isVisible, setIsVisible] = useState(false);
  const hasError = !!error;

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <PasswordWrapper>
      <TextInput
        {...props}
        error={error}
        variant={isVisible ? 'text' : 'password'}
      />

      <ToggleButton
        aria-label={isVisible ? displayHideLabel : displayShowLabel}
        aria-pressed={isVisible}
        onClick={toggleVisibility}
        $hasError={hasError}
        tabIndex={0}
      >
        {isVisible ? <Eye /> : <EyeOff />}
      </ToggleButton>
    </PasswordWrapper>
  );
};

export default PasswordInput;
