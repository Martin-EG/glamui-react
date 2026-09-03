import { styled } from 'styled-components';

import type { AppTheme } from '../../styles/theme';

import type { BoxBackground, BoxBorder, BoxPadding, BoxRadius } from './Box.types';

interface StyledBoxProps {
  readonly $padding?: BoxPadding;
  readonly $radius?: BoxRadius;
  readonly $background?: BoxBackground;
  readonly $border?: BoxBorder;
}

const borderDeclaration = (theme: AppTheme, border?: BoxBorder) => {
  if (!border) return 'border: none;';

  const rule = `1px solid ${theme.colors.border.default}`;

  if (border === true) return `border: ${rule};`;

  return `border-${border}: ${rule};`;
};

export const StyledBox = styled.div<StyledBoxProps>`
  padding: ${({ theme, $padding }) => ($padding ? theme.spacing[$padding] : undefined)};
  border-radius: ${({ theme, $radius }) => ($radius ? theme.radius[$radius] : undefined)};
  background: ${({ theme, $background }) =>
    $background ? theme.colors.surface[$background] : undefined};
  ${({ theme, $border }) => borderDeclaration(theme, $border)}
`;
