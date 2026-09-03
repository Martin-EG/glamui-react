import { styled } from 'styled-components';

import type { StackAlign, StackDirection, StackGap, StackJustify } from './Stack.types';

interface StyledStackProps {
  readonly $direction: StackDirection;
  readonly $gap: StackGap;
  readonly $align: StackAlign;
  readonly $justify: StackJustify;
  readonly $wrap: boolean;
}

const alignItems: Record<StackAlign, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
};

const justifyContent: Record<StackJustify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
};

export const StyledStack = styled.div<StyledStackProps>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  flex-wrap: ${({ $wrap }) => ($wrap ? 'wrap' : 'nowrap')};
  gap: ${({ theme, $gap }) => theme.spacing[$gap]};
  align-items: ${({ $align }) => alignItems[$align]};
  justify-content: ${({ $justify }) => justifyContent[$justify]};
`;
