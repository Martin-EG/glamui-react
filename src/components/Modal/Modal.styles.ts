import { styled } from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.overlay.scrim};

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: ${({ theme }) => theme.zIndex.modal};
`;

export const ModalBase = styled.div`
  background: ${({ theme }) => theme.colors.surface.elevated};
  border-radius: ${({ theme }) => theme.radius.md};

  box-sizing: border-box;
  width: 90%;
  max-height: 90%;
  max-width: 450px;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow: hidden;

  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
`;

export const ModalBody = styled.div`
  min-height: 0;
  overflow-y: auto;
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const Footer = styled.div`
  flex-shrink: 0;
  margin-top: ${({ theme }) => theme.spacing.md};

  display: flex;
  justify-content: flex-end;
  gap: ${({ theme }) => theme.spacing.sm};
`;
