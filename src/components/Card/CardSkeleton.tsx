'use client';

import { FC } from 'react';

import {
  CardSkeletonBody,
  CardSkeletonFooter,
  CardSkeletonRoot,
  SkeletonBlock,
  SkeletonLines,
  SkeletonMediaFrame,
  SkeletonTitleRow,
} from './CardSkeleton.styles';
import type { CardSkeletonProps } from './CardSkeleton.types';

const LINE_WIDTHS = {
  product: ['88%', '74%', '78%', '100%'],
  collection: ['80%', '58%'],
} as const;

const CardSkeleton: FC<CardSkeletonProps> = ({
  size = 'md',
  variant = 'product',
  showFooter = variant === 'product',
  className,
}) => {
  const bodyLines = LINE_WIDTHS[variant].map((width) => (
    <SkeletonBlock key={width} $width={width} $height="12px" />
  ));

  const footer = showFooter ? (
    <CardSkeletonFooter data-testid="card-skeleton-footer">
      <SkeletonBlock $width="62%" $height="32px" />
      <div style={{ display: 'flex', gap: '8px' }}>
        <SkeletonBlock $width="32px" $height="32px" />
        <SkeletonBlock $width="32px" $height="32px" />
      </div>
    </CardSkeletonFooter>
  ) : null;

  const mediaFrame =
    variant !== 'collection' ? (
      <SkeletonMediaFrame $size={size}>
        <SkeletonBlock $size={size} data-testid="card-skeleton-media" />
      </SkeletonMediaFrame>
    ) : null;

  return (
    <CardSkeletonRoot
      $size={size}
      $hasMedia={variant !== 'collection'}
      className={className}
      aria-hidden="true"
      data-testid="card-skeleton"
    >
      {mediaFrame}
      <CardSkeletonBody>
        <SkeletonTitleRow>
          <SkeletonBlock $width="72%" $height="18px" />
          <SkeletonBlock $width="24px" $height="24px" />
        </SkeletonTitleRow>
        <SkeletonLines>{bodyLines}</SkeletonLines>
      </CardSkeletonBody>
      {footer}
    </CardSkeletonRoot>
  );
};

export default CardSkeleton;
