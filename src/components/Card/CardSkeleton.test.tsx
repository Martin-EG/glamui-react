import { render, screen } from '../../test-utils';
import 'jest-styled-components';

import CardSkeleton from './CardSkeleton';

describe('CardSkeleton', () => {
  it.each([
    ['sm', '130px'],
    ['md', '260px'],
    ['lg', '390px'],
    ['xl', '410px'],
  ] as const)('renders %s size with %s height', (size, height) => {
    const { container } = render(<CardSkeleton size={size} />);

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('aria-hidden', 'true');
    expect(root).toHaveStyleRule('height', height);
    expect(root).toHaveStyleRule('display', 'flex');
    expect(root).toHaveStyleRule('flex-direction', 'column');
  });

  it('renders a rectangle media placeholder by default', () => {
    render(<CardSkeleton />);

    const media = screen.getByTestId('card-skeleton-media');
    expect(media).toHaveStyleRule('width', '100%');
    expect(media).toHaveStyleRule('height', '100%');
  });

  it('renders product structure with footer by default', () => {
    render(<CardSkeleton variant="product" />);

    expect(screen.getByTestId('card-skeleton-footer')).toBeInTheDocument();
  });

  it('renders collection structure without footer when disabled', () => {
    render(<CardSkeleton variant="collection" showFooter={false} />);

    expect(
      screen.queryByTestId('card-skeleton-footer'),
    ).not.toBeInTheDocument();
  });
});
