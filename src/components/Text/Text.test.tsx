import { render, screen } from '../../test-utils';
import 'jest-styled-components';

import Text from './Text';

describe('Text', () => {
  it('renders children correctly', () => {
    render(<Text>Hello World</Text>);
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('renders as different HTML elements', () => {
    const { container } = render(<Text as="h1">Heading</Text>);
    const heading = container.querySelector('h1');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Heading');
  });

  it('renders with correct variant styles', () => {
    const { container } = render(<Text variant="caption">Caption Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-caption');
  });

  it('renders with correct size', () => {
    const { container } = render(<Text size="xl">Large Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-xl');
  });

  it('renders with correct weight', () => {
    const { container } = render(<Text weight="bold">Bold Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-bold');
  });

  it('renders with correct color', () => {
    const { container } = render(<Text color="danger">Error Message</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-danger');
  });

  it('renders with correct alignment', () => {
    const { container } = render(<Text align="center">Centered Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-align-center');
  });

  it('handles truncate prop (boolean)', () => {
    const { container } = render(<Text truncate>Truncated Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('text-truncate');
  });

  it('handles truncate prop (number)', () => {
    const { container } = render(<Text truncate={3}>Clamped Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveAttribute('data-clamp', '3');
    expect(text).toHaveStyle({
      WebkitLineClamp: '3',
    });
  });

  it('renders as="code" with the monospace font', () => {
    const { container } = render(<Text as="code">const x = 1;</Text>);
    const code = container.querySelector('code');
    expect(code).toBeInTheDocument();
    expect(code).toHaveClass('text-code');
    expect(code).toHaveStyleRule('font-family', "'Menlo', 'Consolas', monospace", {
      modifier: '&.text-code',
    });
  });

  it('forwards a consumer className alongside its own', () => {
    const { container } = render(<Text className="custom">Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveClass('custom');
    expect(text).toHaveClass('text-body');
  });

  it('forwards a consumer style alongside its own', () => {
    const { container } = render(
      <Text style={{ marginTop: 2 }}>Text</Text>,
    );
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveStyle({ marginTop: '2px' });
  });

  it('merges a consumer style with the truncate clamp style', () => {
    const { container } = render(
      <Text truncate={2} style={{ marginTop: 2 }}>
        Text
      </Text>,
    );
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveStyle({ marginTop: '2px', WebkitLineClamp: '2' });
  });

  it('forwards other standard HTML attributes', () => {
    const { container } = render(<Text data-testid="text-node">Text</Text>);
    const text = container.firstChild as HTMLElement;
    expect(text).toHaveAttribute('data-testid', 'text-node');
  });

  it('renders label with htmlFor', () => {
    const { container } = render(
      <Text as="label" labelFor="input-id">
        Label
      </Text>,
    );
    const label = container.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'input-id');
  });
});
