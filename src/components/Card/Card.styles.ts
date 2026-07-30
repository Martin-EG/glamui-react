import { styled } from 'styled-components';

export const StyledCard = styled.div<{ $hasImage: boolean }>`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.surface.default};
  box-shadow: ${({ theme }) => theme.shadows.md};
  overflow: hidden;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 100%;
    max-width: 440px;
    min-height: 190px;
    display: grid;
    grid-template-columns: ${({ $hasImage }) =>
      $hasImage ? '112px minmax(0, 1fr)' : 'minmax(0, 1fr)'};
    grid-template-rows: 1fr auto;
    gap: 0;
  }

  /* Not in the breakpoints scale — a local squeeze-point. */
  @media (max-width: 360px) {
    grid-template-columns: ${({ $hasImage }) =>
      $hasImage ? '96px minmax(0, 1fr)' : 'minmax(0, 1fr)'};
  }
`;

export const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: ${({ theme }) => theme.radius.sm};
  border-top-right-radius: ${({ theme }) => theme.radius.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 112px;
    height: 100%;
    min-height: 190px;
    grid-column: 1;
    grid-row: 1 / 3;
    border-radius: 0;
  }

  @media (max-width: 360px) {
    width: 96px;
  }
`;

export const CardTitle = styled.div`
  max-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};

  > :first-child {
    min-width: 0;
  }
`;

export const CardBody = styled.div`
  max-height: 300px;
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    min-width: 0;
    padding: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.xs};
    gap: ${({ theme }) => theme.spacing.xs};
  }
`;

export const CardFooter = styled.div`
  max-height: 50px;
  margin-top: auto;
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0 ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.sm};
  }
`;
