'use client';

import { FC, useEffect, useState } from 'react';

const FRAME_COUNT = 6;
const frameDuration = 150;
const lastFrameDuration = 250;

export const getFrameDuration = (frameIndex: number) =>
  frameIndex === FRAME_COUNT - 1 ? lastFrameDuration : frameDuration;

export interface LoadingAnimationProps {
  readonly label: string;
  readonly basePath?: string;
}

const LoadingAnimation: FC<LoadingAnimationProps> = ({
  label,
  basePath = '/loader',
}) => {
  const [activeFrame, setActiveFrame] = useState(0);

  useEffect(() => {
    const timeout = window.setTimeout(
      () =>
        setActiveFrame((currentFrame) =>
          currentFrame === FRAME_COUNT - 1 ? 0 : currentFrame + 1,
        ),
      getFrameDuration(activeFrame),
    );

    return () => window.clearTimeout(timeout);
  }, [activeFrame]);

  const frames = Array.from({ length: FRAME_COUNT }, (_, index) => (
    <img
      key={index}
      src={`${basePath}/frame-${index + 1}.svg`}
      alt=""
      width={160}
      height={120}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        opacity: index === activeFrame ? 1 : 0,
      }}
    />
  ));

  return (
    <div
      role="status"
      aria-label={label}
      aria-live="polite"
      style={{
        position: 'relative',
        width: 160,
        height: 120,
      }}
    >
      {frames}
    </div>
  );
};

export default LoadingAnimation;
