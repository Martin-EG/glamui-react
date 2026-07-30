import { FC } from 'react';
import { useTheme } from 'styled-components';

import {
  RingWrapper,
  RingSvg,
  TrackCircle,
  ProgressCircle,
  RingLabel,
} from './ProgressRing.styles';
import type { ProgressRingProps, ProgressRingSize } from './ProgressRing.types';

const STROKE_WIDTH: Record<ProgressRingSize, number> = {
  sm: 3,
  md: 5,
  lg: 8,
};

const ProgressRing: FC<ProgressRingProps> = ({
  value,
  size = 'md',
  label,
}) => {
  const theme = useTheme();
  const clamped = Math.min(100, Math.max(0, value));

  const diameter = parseInt(theme.size.circle[size], 10);
  const strokeWidth = STROKE_WIDTH[size];
  const radius = (diameter - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const critical = clamped >= 90;

  return (
    <RingWrapper
      $size={size}
      role="progressbar"
      aria-valuenow={Math.round(clamped)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <RingSvg viewBox={`0 0 ${diameter} ${diameter}`} aria-hidden="true">
        <TrackCircle
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <ProgressCircle
          $critical={critical}
          cx={diameter / 2}
          cy={diameter / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </RingSvg>
      <RingLabel $size={size}>{label ?? `${Math.round(clamped)}%`}</RingLabel>
    </RingWrapper>
  );
};

export default ProgressRing;
