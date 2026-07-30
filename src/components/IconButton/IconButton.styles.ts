import { styled } from 'styled-components';

export const StyledIconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.primary};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.brand.primary};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
  }

  &:disabled {
    opacity: ${({ theme }) => theme.opacity.disabledButton};
    cursor: not-allowed;
  }
`;
