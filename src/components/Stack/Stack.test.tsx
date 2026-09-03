import 'jest-styled-components';

import { render, screen } from '../../test-utils';

import Stack from './Stack';

describe('Stack rendering', () => {
  it('renders children', () => {
    render(<Stack>content</Stack>);

    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('renders as a div by default', () => {
    const { container } = render(<Stack>content</Stack>);

    expect(container.querySelector('div')).toBeInTheDocument();
  });

  it('renders as the element passed via "as"', () => {
    const { container } = render(<Stack as="form">content</Stack>);

    expect(container.querySelector('form')).toBeInTheDocument();
  });
});

describe('Stack styling', () => {
  it('defaults to a column direction', () => {
    const { container } = render(<Stack>content</Stack>);

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'column');
  });

  it('applies row direction', () => {
    const { container } = render(<Stack direction="row">content</Stack>);

    expect(container.firstChild).toHaveStyleRule('flex-direction', 'row');
  });

  it('defaults gap to theme.spacing.md', () => {
    const { container } = render(<Stack>content</Stack>);

    expect(container.firstChild).toHaveStyleRule('gap', '12px');
  });

  it('applies gap from theme.spacing', () => {
    const { container } = render(<Stack gap="xl">content</Stack>);

    expect(container.firstChild).toHaveStyleRule('gap', '24px');
  });

  it('applies align-items', () => {
    const { container } = render(<Stack align="center">content</Stack>);

    expect(container.firstChild).toHaveStyleRule('align-items', 'center');
  });

  it('applies justify-content', () => {
    const { container } = render(<Stack justify="between">content</Stack>);

    expect(container.firstChild).toHaveStyleRule('justify-content', 'space-between');
  });

  it('does not wrap by default', () => {
    const { container } = render(<Stack>content</Stack>);

    expect(container.firstChild).toHaveStyleRule('flex-wrap', 'nowrap');
  });

  it('wraps when wrap is true', () => {
    const { container } = render(<Stack wrap>content</Stack>);

    expect(container.firstChild).toHaveStyleRule('flex-wrap', 'wrap');
  });
});

describe('Stack passthrough', () => {
  it('forwards standard HTML attributes', () => {
    render(<Stack data-testid="stack">content</Stack>);

    expect(screen.getByTestId('stack')).toBeInTheDocument();
  });
});
