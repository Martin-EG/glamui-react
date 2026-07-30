import { styled, keyframes } from 'styled-components';
import type { AvatarSize } from './Avatar.types';

const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: 200px 0;
  }
`;

export const SkeletonRoot = styled.div<{ $size: AvatarSize }>`
  width: ${({ theme, $size }) => theme.size.circle[$size]};
  height: ${({ theme, $size }) => theme.size.circle[$size]};
  border-radius: 50%;

  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface.muted} 25%,
    ${({ theme }) => theme.colors.surface.default} 37%,
    ${({ theme }) => theme.colors.surface.muted} 63%
  );
  background-size: 400% 100%;
  animation: ${shimmer}
    var(--motion-duration-shimmer, ${({ theme }) => theme.motion.duration.shimmer})
    var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard})
    infinite;
`;
