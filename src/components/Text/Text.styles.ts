import { styled } from 'styled-components';

import type {
  TextAlign,
  TextColor,
  TextSize,
  TextTruncate,
  TextVariant,
  TextWeight,
} from './Text.types';

interface StyledTextProps {
  readonly $variant: TextVariant;
  readonly $size: TextSize;
  readonly $weight: TextWeight;
  readonly $color: TextColor;
  readonly $truncate: TextTruncate;
  readonly $align: TextAlign;
}

const getTruncateClassname = (truncate: TextTruncate) => {
  let className = '';

  if (truncate === true) {
    className = 'text-truncate';
  } else if (typeof truncate === 'number') {
    className = `text-clamp-${truncate}`;
  }

  return className;
};

export const StyledText = styled.p.attrs<StyledTextProps>(
  ({ $variant, $size, $weight, $color, $truncate, $align }) => ({
    className: `text text-${$variant} text-${$size} text-${$weight} text-${$color} text-align-${$align} ${getTruncateClassname($truncate)}`,
    'data-clamp': !!$truncate ? $truncate : undefined,
    style:
      typeof $truncate === 'number'
        ? { WebkitLineClamp: $truncate }
        : undefined,
  }),
)<StyledTextProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.primary};

  /* Variants */
  &.text-body {
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  }

  &.text-caption {
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
    opacity: ${({ theme }) => theme.opacity.caption};
  }

  &.text-label {
    display: block;
    letter-spacing: 0.04em;
  }

  &.text-heading {
    line-height: ${({ theme }) => theme.typography.lineHeights.tight};
  }

  &.text-subheading {
    line-height: ${({ theme }) => theme.typography.lineHeights.normal};
  }

  /* Sizes */
  &.text-xs {
    font-size: ${({ theme }) => theme.typography.sizes.xs};
  }

  &.text-sm {
    font-size: ${({ theme }) => theme.typography.sizes.sm};
  }

  &.text-md {
    font-size: ${({ theme }) => theme.typography.sizes.md};
  }

  &.text-lg {
    font-size: ${({ theme }) => theme.typography.sizes.lg};
  }

  &.text-xl {
    font-size: ${({ theme }) => theme.typography.sizes.xl};
  }

  &.text-xxl {
    font-size: ${({ theme }) => theme.typography.sizes.xxl};
  }

  /* Weights */
  &.text-regular {
    font-weight: ${({ theme }) => theme.typography.weights.regular};
  }

  &.text-medium {
    font-weight: ${({ theme }) => theme.typography.weights.medium};
  }

  &.text-semibold {
    font-weight: ${({ theme }) => theme.typography.weights.semibold};
  }

  &.text-bold {
    font-weight: ${({ theme }) => theme.typography.weights.bold};
  }

  /* Colors */
  &.text-default {
    color: ${({ theme }) => theme.colors.text.primary};
  }

  &.text-light {
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  &.text-muted {
    color: ${({ theme }) => theme.colors.text.muted};
  }

  &.text-brand {
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &.text-brandSecondary {
    color: ${({ theme }) => theme.colors.brand.secondary};
  }

  &.text-danger {
    color: ${({ theme }) => theme.colors.text.danger};
  }

  &.text-error {
    color: ${({ theme }) => theme.colors.feedback.errorText};
  }

  &.text-success {
    color: ${({ theme }) => theme.colors.feedback.successText};
  }

  &.text-warning {
    color: ${({ theme }) => theme.colors.feedback.warningText};
  }

  &.text-info {
    color: ${({ theme }) => theme.colors.feedback.infoText};
  }

  /* Alignments */
  &.text-align-left {
    text-align: left;
  }

  &.text-align-center {
    text-align: center;
  }

  &.text-align-right {
    text-align: right;
  }

  &.text-align-justify {
    text-align: justify;
  }

  /* Single-line truncate */
  &.text-truncate {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* Multi-line clamp */
  &[data-clamp] {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: ${({ $truncate }) =>
      typeof $truncate === 'number' ? $truncate : 1};
  }
`;
