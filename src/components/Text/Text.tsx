import { FC, PropsWithChildren } from 'react';

import { StyledText } from './Text.styles';
import type {
  TextAs,
  TextAlign,
  TextColor,
  TextSize,
  TextTruncate,
  TextVariant,
  TextWeight,
} from './Text.types';

export interface TextProps extends PropsWithChildren {
  readonly as?: TextAs;
  readonly variant?: TextVariant;
  readonly size?: TextSize;
  readonly weight?: TextWeight;
  readonly color?: TextColor;
  readonly truncate?: TextTruncate;
  readonly align?: TextAlign;
  readonly labelFor?: string;
}

const Text: FC<TextProps> = ({
  as = 'p',
  variant = 'body',
  size = 'md',
  weight = 'regular',
  color = 'default',
  truncate = false,
  align = 'left',
  labelFor,
  children,
}) => {
  const labelProps = as === 'label' ? { htmlFor: labelFor } : {};

  return (
    <StyledText
      as={as}
      $as={as}
      $variant={variant}
      $size={size}
      $weight={weight}
      $color={color}
      $truncate={truncate}
      $align={align}
      {...labelProps}
    >
      {children}
    </StyledText>
  );
};

export default Text;
