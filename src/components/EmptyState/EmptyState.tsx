import type { FC } from 'react';

import Text from '../Text';

import {
  EmptyStateAction,
  EmptyStateIcon,
  StyledEmptyState,
} from './EmptyState.styles';
import type { EmptyStateProps } from './EmptyState.types';

/**
 * The zero-content state for any list or collection — no products yet, no
 * search matches, nothing to show after a filter. Composes Text and an
 * optional icon/action rather than owning typography or button behavior
 * itself.
 *
 * @category Display
 * @status stable
 * @since 0.1.0
 */
const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  const iconElement = icon ? (
    <EmptyStateIcon aria-hidden="true">{icon}</EmptyStateIcon>
  ) : null;

  const descriptionElement = description ? (
    <Text as="p" size="sm" color="muted">
      {description}
    </Text>
  ) : null;

  const actionElement = action ? (
    <EmptyStateAction>{action}</EmptyStateAction>
  ) : null;

  return (
    <StyledEmptyState>
      {iconElement}
      <Text as="p" size="md" weight="semibold">
        {title}
      </Text>
      {descriptionElement}
      {actionElement}
    </StyledEmptyState>
  );
};

export default EmptyState;
