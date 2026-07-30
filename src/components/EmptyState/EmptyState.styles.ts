import { styled } from 'styled-components';

export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.md};
`;

// Only sets color — GlamUI icons inherit stroke from currentColor, so this
// mutes a decorative icon without overriding whatever \`size\` the consumer
// passed it. Overriding size here would silently fight that prop.
export const EmptyStateIcon = styled.div`
  display: flex;
  color: ${({ theme }) => theme.colors.text.muted};
`;

export const EmptyStateAction = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xs};
`;
