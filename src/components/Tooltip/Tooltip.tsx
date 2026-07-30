import {
  FC,
  KeyboardEvent,
  ReactElement,
  cloneElement,
  useCallback,
  useId,
  useState,
} from 'react';

import { TooltipWrapper, TooltipBubble } from './Tooltip.styles';
import type { TooltipProps } from './Tooltip.types';

const Tooltip: FC<TooltipProps> = ({ label, children, placement = 'top' }) => {
  const tooltipId = useId();
  const [isVisible, setIsVisible] = useState(false);

  const show = useCallback(() => setIsVisible(true), []);
  const hide = useCallback(() => setIsVisible(false), []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        hide();
      }
    },
    [hide],
  );

  const trigger = cloneElement(children as ReactElement<Record<string, unknown>>, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    onKeyDown: handleKeyDown,
    'aria-describedby': isVisible ? tooltipId : undefined,
  });

  const tooltipBubble = isVisible ? (
    <TooltipBubble role="tooltip" id={tooltipId} $placement={placement}>
      {label}
    </TooltipBubble>
  ) : null;

  return (
    <TooltipWrapper>
      {trigger}
      {tooltipBubble}
    </TooltipWrapper>
  );
};

export default Tooltip;
