import { styled } from 'styled-components';

export const PasswordWrapper = styled.div`
  position: relative;
`;

interface ToggleButtonProps {
  $hasError: boolean;
}

export const ToggleButton = styled.button.attrs({
  type: 'button',
})<ToggleButtonProps>`
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.spacing.sm};
  transform: ${({ $hasError }) =>
    $hasError ? 'translateY(-30%)' : 'translateY(0)'};

  width: ${({ theme }) => theme.size.iconSlot};
  height: ${({ theme }) => theme.size.iconSlot};

  display: inline-flex;
  align-items: center;
  justify-content: center;

  background: transparent;
  border: none;
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.secondary};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.brand.primary};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
