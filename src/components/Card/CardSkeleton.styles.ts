import { styled, css, keyframes } from 'styled-components';

import type { CardSkeletonSize } from './CardSkeleton.types';

const CARD_HEIGHT_MAP: Record<CardSkeletonSize, string> = {
  sm: '130px',
  md: '260px',
  lg: '390px',
  xl: '410px',
};

const MEDIA_HEIGHT_MAP: Record<CardSkeletonSize, string> = {
  sm: '108px',
  md: '140px',
  lg: '280px',
  xl: '200px',
};

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

const skeletonBackground = css`
  background-size: 400% 100%;
  animation: ${shimmer}
    var(--motion-duration-shimmer, ${({ theme }) => theme.motion.duration.shimmer})
    var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard})
    infinite;
`;

export const CardSkeletonRoot = styled.div<{
  $size: CardSkeletonSize;
  $hasMedia: boolean;
}>`
  height: ${({ $size }) => CARD_HEIGHT_MAP[$size]};
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
    height: 190px;
    display: grid;
    grid-template-columns: ${({ $hasMedia }) =>
      $hasMedia ? '112px minmax(0, 1fr)' : 'minmax(0, 1fr)'};
    grid-template-rows: 1fr auto;
    gap: 0;
  }

  /* Local squeeze-point, not a system breakpoint — see Card.styles.ts. */
  @media (max-width: 360px) {
    grid-template-columns: ${({ $hasMedia }) =>
      $hasMedia ? '96px minmax(0, 1fr)' : 'minmax(0, 1fr)'};
  }
`;

export const SkeletonMediaFrame = styled.div<{ $size: CardSkeletonSize }>`
  width: 100%;
  height: ${({ $size }) => MEDIA_HEIGHT_MAP[$size]};
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    width: 112px;
    height: 190px;
    grid-column: 1;
    grid-row: 1 / 3;
  }

  @media (max-width: 360px) {
    width: 96px;
  }
`;

export const SkeletonBlock = styled.div<{
  $size?: CardSkeletonSize;
  $width?: string;
  $height?: string;
}>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '100%'};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface.muted} 25%,
    ${({ theme }) => theme.colors.surface.default} 37%,
    ${({ theme }) => theme.colors.surface.muted} 63%
  );
  ${skeletonBackground}
`;

export const CardSkeletonBody = styled.div`
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

export const SkeletonTitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const SkeletonLines = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const CardSkeletonFooter = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  padding-top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
    padding: 0 ${({ theme }) => theme.spacing.sm}
      ${({ theme }) => theme.spacing.sm};
  }
`;
