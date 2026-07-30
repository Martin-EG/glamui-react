import { styled } from 'styled-components';

export const Track = styled.div`
  display: inline-flex;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs};
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.surface.muted};
`;

export const Segment = styled.button<{ $selected: boolean }>`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  height: ${({ theme }) => theme.size.field};
  padding: 0 ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.xl};

  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};

  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.text.onBrand : theme.colors.text.secondary};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.brand.primary : 'transparent'};

  transition:
    background
      var(--motion-duration-base, ${({ theme }) => theme.motion.duration.base})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard}),
    color
      var(--motion-duration-base, ${({ theme }) => theme.motion.duration.base})
      var(--motion-easing-standard, ${({ theme }) => theme.motion.easing.standard});

  &:hover {
    background: ${({ theme, $selected }) =>
      $selected ? theme.colors.brand.primary : theme.colors.surface.hover};
  }

  &:focus-visible {
    outline: ${({ theme }) => theme.focus.ring.width} solid
      ${({ theme }) => theme.colors.border.focus};
    outline-offset: ${({ theme }) => theme.focus.ring.offset};
  }
`;
