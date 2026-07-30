export type CardSkeletonSize = 'sm' | 'md' | 'lg' | 'xl';

export type CardSkeletonVariant = 'product' | 'collection';

export interface CardSkeletonProps {
  readonly size?: CardSkeletonSize;
  readonly variant?: CardSkeletonVariant;
  readonly showFooter?: boolean;
  readonly className?: string;
}
