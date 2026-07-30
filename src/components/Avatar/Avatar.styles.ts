import { styled } from 'styled-components';

import type { AvatarSize } from './Avatar.types';

interface StyledAvatarProps {
  readonly $size: AvatarSize;
  readonly $clickable: boolean;
}

export const AvatarRoot = styled.div.attrs<StyledAvatarProps>(
  ({ $clickable }) => ({
    role: $clickable ? 'button' : 'img',
    tabIndex: $clickable ? 0 : -1,
  }),
)<StyledAvatarProps>`
  width: ${({ theme, $size }) => theme.size.circle[$size]};
  height: ${({ theme, $size }) => theme.size.circle[$size]};
  border-radius: 50%;

  background: ${({ theme }) => theme.colors.surface.muted};
  border: 2px ${({ $clickable }) => ($clickable ? 'dashed' : 'solid')}
    ${({ theme }) => theme.colors.border.muted};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  position: relative;
  overflow: hidden;

  transition:
    border-color
      var(--motion-duration-base, ${({ theme }) => theme.motion.duration.base})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard}),
    background-color
      var(--motion-duration-base, ${({ theme }) => theme.motion.duration.base})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard});

  &:hover {
    border-color: ${({ theme, $clickable }) =>
      $clickable ? theme.colors.brand.primary : theme.colors.border.muted};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.brand.primary};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
  }
`;

export const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

export const AvatarPlaceholder = styled.div`
  width: ${({ theme }) => theme.size.iconSlot};
  height: ${({ theme }) => theme.size.iconSlot};

  background: url('/camera.svg') center / contain no-repeat;
  color: ${({ theme }) => theme.colors.text.muted};
  opacity: ${({ theme }) => theme.opacity.decorative};

  pointer-events: none;
`;
