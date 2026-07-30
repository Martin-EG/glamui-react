import { FC, PropsWithChildren, useId } from 'react';
import { IconProps, iconSizes } from './Icon.types';

interface IconWrapperProps extends IconProps {
  viewBox?: string;
}

export const Icon: FC<PropsWithChildren<IconWrapperProps>> = ({
  size = 'sm',
  color = 'currentColor',
  strokeWidth = 1.5,
  viewBox = '0 0 24 24',
  title: titleText,
  className,
  children,
}) => {
  const uniqueId = useId();
  const titleId = titleText ? `icon-title-${uniqueId}` : undefined;
  const title = titleText ? <title id={titleId}>{titleText}</title> : null;

  return (
    <svg
      width={iconSizes[size]}
      height={iconSizes[size]}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
      focusable="false"
    >
      {title}
      {children}
    </svg>
  );
};
