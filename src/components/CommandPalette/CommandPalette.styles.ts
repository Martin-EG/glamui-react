import { styled, keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};

  background: ${({ theme }) => theme.colors.overlay.scrim};
  backdrop-filter: blur(${({ theme }) => theme.effects.blur.sm});

  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 15vh;

  animation: ${fadeIn}
    var(--motion-duration-fast, ${({ theme }) => theme.motion.duration.fast})
    var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard});
`;

export const Panel = styled.div`
  width: 100%;
  max-width: 480px;
  max-height: 60vh;
  margin: 0 ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  overflow: hidden;

  background: ${({ theme }) => theme.colors.surface.elevated};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};

  animation: ${slideDown}
    var(--motion-duration-moderate, ${({ theme }) => theme.motion.duration.moderate})
    var(--motion-easing-decelerate, ${({ theme }) => theme.motion.easing.decelerate});
`;

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const SearchInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  font-size: ${({ theme }) => theme.typography.sizes.md};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
`;

export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: ${({ theme }) => theme.spacing.xs} 0;
  overflow-y: auto;
`;

export const ListItemButton = styled.button`
  all: unset;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.sm}
    ${({ theme }) => theme.spacing.md};
  min-height: ${({ theme }) => theme.size.minTouchTarget};
  cursor: pointer;

  color: ${({ theme }) => theme.colors.text.primary};

  /* Focus moves between real items on arrow keys, so :focus doubles as the "active" state. */
  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.border.focus};
  }
`;

export const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  color: ${({ theme }) => theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;
