import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Searchbar, Text } from '@glamui/react';

import { componentGroups } from '../nav-data';

const SearchWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
`;

const Nav = styled.nav<{ $isOpen: boolean }>`
  width: 240px;
  flex-shrink: 0;
  padding: ${({ theme }) => theme.spacing.lg};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
  overflow-y: auto;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: ${({ theme }) => theme.zIndex.modal};
    background: ${({ theme }) => theme.colors.surface.default};
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.2s ease;
  }
`;

const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: ${({ theme }) => theme.zIndex.modal - 1};
  }
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

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');

  const normalizedQuery = query.trim().toLowerCase();
  const filteredGroups = normalizedQuery
    ? componentGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) =>
            item.label.toLowerCase().includes(normalizedQuery),
          ),
        }))
        .filter((group) => group.items.length > 0)
    : componentGroups;

  return (
    <>
      <Overlay $isOpen={isOpen} onClick={onClose} />
      <Nav $isOpen={isOpen}>
        <SearchWrap>
          <Searchbar
            placeholder="Search components"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
          />
        </SearchWrap>

        <StyledLink to="/" end onClick={onClose}>
          Introduction
        </StyledLink>
        <StyledLink to="/tokens" onClick={onClose}>
          Tokens
        </StyledLink>
        <StyledLink to="/templates" onClick={onClose}>
          Templates
        </StyledLink>

        {filteredGroups.map((group) => (
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
              <StyledLink
                key={item.slug}
                to={`/components/${item.slug}`}
                onClick={onClose}
              >
                {item.label}
              </StyledLink>
            ))}
          </div>
        ))}

        {normalizedQuery && filteredGroups.length === 0 && (
          <Text size="sm" color="muted">
            No components match &quot;{query}&quot;.
          </Text>
        )}
      </Nav>
    </>
  );
}
