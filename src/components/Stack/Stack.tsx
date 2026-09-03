import type { FC } from 'react';

import { StyledStack } from './Stack.styles';
import type { StackProps } from './Stack.types';

/**
 * A flex layout primitive — direction, gap, alignment — for composing
 * components in a row or column without a bespoke `styled.div`.
 *
 * @category Layout
 * @status experimental
 * @since 0.2.0
 */
const Stack: FC<StackProps> = ({
  as = 'div',
  direction = 'column',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  children,
  ...props
}) => {
  return (
    <StyledStack
      as={as}
      $direction={direction}
      $gap={gap}
      $align={align}
      $justify={justify}
      $wrap={wrap}
      {...props}
    >
      {children}
    </StyledStack>
  );
};

export default Stack;
