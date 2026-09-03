import type { FC } from 'react';

import { StyledBox } from './Box.styles';
import type { BoxProps } from './Box.types';

/**
 * A generic bordered/padded/rounded/surfaced container, built from theme
 * tokens. Reach for it instead of a one-off `styled.div` when you need a
 * themed box without any of `Card`'s title/image/footer/menu semantics.
 *
 * @category Layout
 * @status experimental
 * @since 0.2.0
 */
const Box: FC<BoxProps> = ({
  as = 'div',
  padding,
  radius,
  background,
  border = false,
  children,
  ...props
}) => {
  return (
    <StyledBox
      as={as}
      $padding={padding}
      $radius={radius}
      $background={background}
      $border={border}
      {...props}
    >
      {children}
    </StyledBox>
  );
};

export default Box;
