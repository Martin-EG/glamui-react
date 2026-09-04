import styled from 'styled-components';
import { Button, IconButton } from '@glamui/react';

import { useAppTheme } from '../theme-context';

const Bar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
`;

const LeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const MenuButton = styled(IconButton)`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: inline-flex;
  }
`;

const Logo = styled.img`
  width: 160px;
  height: 60px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    width: 140px;
    height: 50px;
  }
`;

export function TopBar({ onMenuClick }: { onMenuClick: () => void }) {
  const { themeName, toggleTheme } = useAppTheme();

  return (
    <Bar>
      <LeftGroup>
        <MenuButton
          icon={<span aria-hidden="true">☰</span>}
          label="Toggle sidebar"
          onClick={onMenuClick}
        />
        <Logo src="/GlamUI.svg" alt="GlamUI logo" />
      </LeftGroup>
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
