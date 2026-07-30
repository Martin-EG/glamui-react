'use client';

import { FC } from 'react';
import { useTheme } from 'styled-components';

import LoadingAnimation from '../LoadingAnimation';

export interface LoadingOverlayProps {
  readonly label: string;
  readonly fullScreen?: boolean;
}

const LoadingOverlay: FC<LoadingOverlayProps> = ({
  label,
  fullScreen = true,
}) => {
  const theme = useTheme();

  return (
    <div
      data-testid="loading-overlay"
      style={{
        position: fullScreen ? 'fixed' : 'absolute',
        inset: 0,
        zIndex: theme.zIndex.modal,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: theme.colors.overlay.loading,
        backdropFilter: `blur(${theme.effects.blur.sm})`,
      }}
    >
      <LoadingAnimation label={label} />
    </div>
  );
};

export default LoadingOverlay;
