import styled from 'styled-components';
import { Button } from '@glamui/react';

import { useAppTheme } from '../theme-context';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const Brand = styled.span`
  font-weight: 700;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

export function TopBar() {
  const { themeName, toggleTheme } = useAppTheme();

  return (
    <Bar>
      <Brand>GlamUI</Brand>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        aria-label="Toggle color theme"
      >
        {themeName === 'light' ? 'Dark mode' : 'Light mode'}
      </Button>
    </Bar>
  );
}
