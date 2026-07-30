import styled from 'styled-components';

export const AccordionRoot = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AccordionItemRoot = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};

  &:first-child {
    border-top: 1px solid ${({ theme }) => theme.colors.border.default};
  }
`;

export const TriggerButton = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  min-height: ${({ theme }) => theme.size.minTouchTarget};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};

  padding: ${({ theme }) => theme.spacing.md} 0;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:focus-visible {
    box-shadow: 0 0 0 ${({ theme }) => theme.focus.ring.width}
      ${({ theme }) => theme.colors.brand.primaryAlpha};
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;

export const ChevronWrapper = styled.span<{ $isExpanded: boolean }>`
  display: flex;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.muted};
  transform: rotate(${({ $isExpanded }) => ($isExpanded ? '180deg' : '0deg')});
  transition: transform
    var(--motion-duration-base, ${({ theme }) => theme.motion.duration.base})
    var(
      --motion-easing-standard,
      ${({ theme }) => theme.motion.easing.standard}
    );
`;

/**
 * The `grid-template-rows: 0fr` → `1fr` technique: animates height
 * without measuring pixel heights in JS (which would need a
 * `ResizeObserver` and still fight dynamic content), and without
 * `height: auto`, which cannot be transitioned at all. `overflow:
 * hidden` on the grid container clips the row during the transition;
 * the single grid item (`PanelInner`) needs `min-height: 0` to override
 * grid's default `min-height: auto`, which would otherwise refuse to
 * shrink the row below the item's content size no matter what
 * `grid-template-rows` asks for.
 *
 * `PanelInner` carries `min-height: 0` and `overflow: hidden` and
 * nothing else — no padding. That's deliberate, not an oversight: a
 * grid item's "automatic minimum size" is based on its content *plus
 * its own padding*, and `min-height: 0` doesn't override padding's
 * contribution to that minimum — a collapsed panel with padding
 * directly on this element leaked exactly that padding's height
 * through as visible content while "collapsed" (caught by screenshot
 * verification, not by the unit tests above — `aria-hidden`/
 * `aria-expanded` were correct the whole time, so accessibility-tree
 * assertions never caught it; only looking at the rendered pixels did).
 * `PanelContent` (the actual padded, colored text wrapper) is nested
 * one level deeper, outside the element grid sizing math applies to.
 */
export const Panel = styled.div<{ $isExpanded: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isExpanded }) => ($isExpanded ? '1fr' : '0fr')};
  overflow: hidden;
  transition: grid-template-rows
    var(
      --motion-duration-moderate,
      ${({ theme }) => theme.motion.duration.moderate}
    )
    var(
      --motion-easing-standard,
      ${({ theme }) => theme.motion.easing.standard}
    );
`;

export const PanelInner = styled.div`
  min-height: 0;
  overflow: hidden;
`;

export const PanelContent = styled.div`
  padding-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;
