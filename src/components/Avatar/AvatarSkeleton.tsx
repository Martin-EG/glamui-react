'use client';

import { FC } from 'react';
import { SkeletonRoot } from './AvatarSkeleton.styles';
import type { AvatarSize } from './Avatar.types';

interface AvatarSkeletonProps {
  size: AvatarSize;
}

const AvatarSkeleton: FC<AvatarSkeletonProps> = ({ size }) => {
  return <SkeletonRoot $size={size} aria-hidden />;
};

export default AvatarSkeleton;
