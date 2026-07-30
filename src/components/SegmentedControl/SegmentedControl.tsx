import { FC, KeyboardEvent, useRef } from 'react';

import { Track, Segment } from './SegmentedControl.styles';
import type { SegmentedControlProps } from './SegmentedControl.types';

const SegmentedControl: FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  'aria-label': ariaLabel,
}) => {
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') {
      return;
    }

    event.preventDefault();
    const delta = event.key === 'ArrowRight' ? 1 : -1;
    const nextIndex = (index + delta + options.length) % options.length;
    const next = options[nextIndex];

    onChange(next.value);
    segmentRefs.current[nextIndex]?.focus();
  };

  return (
    <Track role="radiogroup" aria-label={ariaLabel}>
      {options.map((option, index) => {
        const isSelected = option.value === value;

        return (
          <Segment
            key={option.value}
            ref={(el) => {
              segmentRefs.current[index] = el;
            }}
            role="radio"
            aria-checked={isSelected}
            tabIndex={isSelected ? 0 : -1}
            $selected={isSelected}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {option.label}
          </Segment>
        );
      })}
    </Track>
  );
};

export default SegmentedControl;
