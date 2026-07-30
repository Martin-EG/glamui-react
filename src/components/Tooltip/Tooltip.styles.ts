import { styled, keyframes, css } from 'styled-components';

import type { TooltipPlacement } from './Tooltip.types';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const TooltipWrapper = styled.span`
  position: relative;
  display: inline-flex;
`;

const placementStyles: Record<TooltipPlacement, ReturnType<typeof css>> = {
  top: css`
    bottom: calc(100% + ${({ theme }) => theme.spacing.xs});
    left: 50%;
    transform: translateX(-50%);
  `,
  bottom: css`
    top: calc(100% + ${({ theme }) => theme.spacing.xs});
    left: 50%;
    transform: translateX(-50%);
  `,
  left: css`
    right: calc(100% + ${({ theme }) => theme.spacing.xs});
    top: 50%;
    transform: translateY(-50%);
  `,
  right: css`
    left: calc(100% + ${({ theme }) => theme.spacing.xs});
    top: 50%;
    transform: translateY(-50%);
  `,
};

export const TooltipBubble = styled.span<{ $placement: TooltipPlacement }>`
  position: absolute;
  ${({ $placement }) => placementStyles[$placement]}

  z-index: ${({ theme }) => theme.zIndex.tooltip};
  max-width: 220px;
  width: max-content;
  padding: ${({ theme }) => theme.spacing.xs}
    ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};

  background: ${({ theme }) => theme.colors.surface.inverse};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  line-height: ${({ theme }) => theme.typography.lineHeights.tight};

  pointer-events: none;

  animation: ${fadeIn}
    var(--motion-duration-fast, ${({ theme }) => theme.motion.duration.fast})
    var(--motion-easing-decelerate, ${({ theme }) => theme.motion.easing.decelerate});
`;
