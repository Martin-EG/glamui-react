import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '@glamui/react';

import { componentGroups } from '../nav-data';

const Nav = styled.nav`
  width: 240px;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  overflow-y: auto;
`;

const GroupTitleWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const StyledLink = styled(NavLink)`
  display: block;
  padding: 6px ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &.active {
    background: ${({ theme }) => theme.colors.brand.primaryAlpha};
    color: ${({ theme }) => theme.colors.brand.secondary};
    font-weight: 600;
  }
`;

export function Sidebar() {
  return (
    <Nav>
      <StyledLink to="/" end>
        Introduction
      </StyledLink>
      <StyledLink to="/tokens">Tokens</StyledLink>
      <StyledLink to="/templates">Templates</StyledLink>

      {componentGroups.map((group) => (
        <div key={group.title}>
          <GroupTitleWrap>
            <Text
              as="div"
              variant="label"
              size="xs"
              weight="bold"
              color="muted"
              style={{ textTransform: 'uppercase' }}
            >
              {group.title}
            </Text>
          </GroupTitleWrap>
          {group.items.map((item) => (
            <StyledLink key={item.slug} to={`/components/${item.slug}`}>
              {item.label}
            </StyledLink>
          ))}
        </div>
      ))}
    </Nav>
  );
}
