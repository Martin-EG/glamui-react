import { forwardRef } from 'react';
import { StyledIconButton } from './IconButton.styles';
import type { IconButtonProps } from './IconButton.types';

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, label, ...props }, ref) => {
    return (
      <StyledIconButton ref={ref} aria-label={label} title={label} {...props}>
        {icon}
      </StyledIconButton>
    );
  },
);

IconButton.displayName = 'IconButton';

export default IconButton;
