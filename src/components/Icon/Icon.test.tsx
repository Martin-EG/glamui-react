import { render } from '../../test-utils';
import 'jest-styled-components';

import { Icon } from './Icon';

describe('Icon', () => {
  it('renders default icon', () => {
    const { container } = render(
      <Icon>
        <path d="M10 10" />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();

    expect(svg).toHaveAttribute('width', '16');
    expect(svg).toHaveAttribute('height', '16');

    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('stroke-width', '1.5');

    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('aria-hidden', 'true');
  });

  it('renders with custom size', () => {
    const { container } = render(
      <Icon size="lg">
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '24');
    expect(svg).toHaveAttribute('height', '24');
  });

  it('renders with custom color and stroke width', () => {
    const { container } = render(
      <Icon color="red" strokeWidth={2}>
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'red');
    expect(svg).toHaveAttribute('stroke-width', '2');
  });

  it('renders with title', () => {
    const { container } = render(
      <Icon title="Icon Title">
        <path />
      </Icon>,
    );

    const titleEl = container.querySelector('title');
    expect(titleEl).toBeInTheDocument();
    expect(titleEl).toHaveTextContent('Icon Title');
  });

  it('renders with custom className', () => {
    const { container } = render(
      <Icon className="custom-class">
        <path />
      </Icon>,
    );

    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
