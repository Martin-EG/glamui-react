'use client';

import { FC } from 'react';

import { AvatarRoot, AvatarImage, AvatarPlaceholder } from './Avatar.styles';
import type { AvatarProps } from './Avatar.types';
import AvatarSkeleton from './AvatarSkeleton';

const Avatar: FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  editable = false,
  loading = false,
  onClick,
  editAriaLabel = 'Change profile picture',
}) => {
  if (loading) {
    return <AvatarSkeleton size={size} />;
  }

  const clickable = editable && !!onClick;

  return (
    <AvatarRoot
      as={clickable ? 'button' : 'div'}
      type={clickable ? 'button' : undefined}
      onClick={clickable ? onClick : undefined}
      aria-label={clickable ? editAriaLabel : undefined}
      $size={size}
      $clickable={clickable}
    >
      {src ? (
        <AvatarImage src={src} alt={alt} />
      ) : (
        <AvatarPlaceholder aria-hidden />
      )}
    </AvatarRoot>
  );
};

export default Avatar;
