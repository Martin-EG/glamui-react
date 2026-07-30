import { styled } from 'styled-components';

import type { ProgressRingSize } from './ProgressRing.types';

export const RingWrapper = styled.div<{ $size: ProgressRingSize }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ theme, $size }) => theme.size.circle[$size]};
  height: ${({ theme, $size }) => theme.size.circle[$size]};
`;

export const RingSvg = styled.svg`
  width: 100%;
  height: 100%;
  /* SVG circles start at 3 o'clock; rotate so progress starts at 12. */
  transform: rotate(-90deg);
`;

export const TrackCircle = styled.circle`
  fill: none;
  stroke: ${({ theme }) => theme.colors.border.subtle};
`;

export const ProgressCircle = styled.circle<{ $critical: boolean }>`
  fill: none;
  stroke: ${({ theme, $critical }) =>
    $critical ? theme.colors.feedback.errorText : theme.colors.brand.primary};
  stroke-linecap: round;
  transition: stroke-dashoffset
    var(--motion-duration-slow, ${({ theme }) => theme.motion.duration.slow})
    var(--motion-easing-decelerate, ${({ theme }) => theme.motion.easing.decelerate});
`;

export const RingLabel = styled.span<{ $size: ProgressRingSize }>`
  position: absolute;
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme, $size }) =>
    $size === 'lg'
      ? theme.typography.sizes.lg
      : $size === 'md'
        ? theme.typography.sizes.sm
        : theme.typography.sizes.xs};
`;
