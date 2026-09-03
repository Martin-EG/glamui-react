import 'jest-styled-components';

import { render, screen } from '../../test-utils';

import Box from './Box';

describe('Box rendering', () => {
  it('renders children', () => {
    render(<Box>content</Box>);

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    const { container } = render(<Box>content</Box>);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders as the element passed via "as"', () => {
    const { container } = render(<Box as="section">content</Box>);

    expect(container.querySelector('section')).toBeInTheDocument();
  });
});

describe('Box styling', () => {
  it('applies padding from theme.spacing', () => {
    const { container } = render(<Box padding="lg">content</Box>);

    expect(container.firstChild).toHaveStyleRule('padding', '16px');
  });

  it('applies radius from theme.radius', () => {
    const { container } = render(<Box radius="lg">content</Box>);

    expect(container.firstChild).toHaveStyleRule('border-radius', '12px');
  });

  it('applies background from theme.colors.surface', () => {
    const { container } = render(<Box background="subtle">content</Box>);

    expect(container.firstChild).toHaveStyleRule('background', /.+/);
  });

  it('has no border by default', () => {
    const { container } = render(<Box>content</Box>);

    expect(container.firstChild).toHaveStyleRule('border', 'none');
  });

  it('applies a 1px default border when border is true', () => {
    const { container } = render(<Box border>content</Box>);

    expect(container.firstChild).toHaveStyleRule('border', /1px solid/);
  });

  it.each(['top', 'right', 'bottom', 'left'] as const)(
    'applies a 1px border only on the %s side when border is that side',
    (side) => {
      const { container } = render(<Box border={side}>content</Box>);

      expect(container.firstChild).toHaveStyleRule(`border-${side}`, /1px solid/);
      expect(container.firstChild).not.toHaveStyleRule('border');
    },
  );

  it('applies no padding/radius/background when omitted', () => {
    const { container } = render(<Box>content</Box>);

    expect(container.firstChild).not.toHaveStyleRule('padding');
    expect(container.firstChild).not.toHaveStyleRule('border-radius');
  });
});

describe('Box passthrough', () => {
  it('forwards standard HTML attributes', () => {
    render(<Box data-testid="box">content</Box>);

    expect(screen.getByTestId('box')).toBeInTheDocument();
  });
});
