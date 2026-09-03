import { styled } from 'styled-components';

import type { BoxBackground, BoxPadding, BoxRadius } from './Box.types';

interface StyledBoxProps {
  readonly $padding?: BoxPadding;
  readonly $radius?: BoxRadius;
  readonly $background?: BoxBackground;
  readonly $border?: boolean;
}

export const StyledBox = styled.div<StyledBoxProps>`
  padding: ${({ theme, $padding }) => ($padding ? theme.spacing[$padding] : undefined)};
  border-radius: ${({ theme, $radius }) => ($radius ? theme.radius[$radius] : undefined)};
  background: ${({ theme, $background }) =>
    $background ? theme.colors.surface[$background] : undefined};
  border: ${({ theme, $border }) =>
    $border ? `1px solid ${theme.colors.border.default}` : 'none'};
`;
