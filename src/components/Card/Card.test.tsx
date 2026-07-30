import { fireEvent, render, screen } from '../../test-utils';
import 'jest-styled-components';

import Card from './Card';

describe('Card', () => {
  const defaultProps = {
    title: 'Test Card',
    body: <div>Card Body Content</div>,
  };

  it('renders title and body', () => {
    const { container } = render(<Card {...defaultProps} />);

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(screen.getByText('Card Body Content')).toBeInTheDocument();

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyleRule('width', '300px');
    expect(root).toHaveStyleRule('display', 'flex');
    expect(root).toHaveStyleRule('flex-direction', 'column');
  });

  it('renders with image', () => {
    render(<Card {...defaultProps} image="test-image.jpg" />);

    const image = screen.getByRole('img', { name: 'Test Card' });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');

    expect(image).toHaveStyleRule('width', '100%');
    expect(image).toHaveStyleRule('height', '200px');
    expect(image).toHaveStyleRule('object-fit', 'cover');
  });

  it('renders with footer', () => {
    render(<Card {...defaultProps} footer={<div>Footer Content</div>} />);

    expect(screen.getByText('Footer Content')).toBeInTheDocument();
  });

  it('renders with options menu', () => {
    const options = [{ label: 'Option 1', onClick: jest.fn() }];

    render(<Card {...defaultProps} options={options} />);

    const trigger = screen.getByRole('button', {
      name: 'Open menu',
    });

    fireEvent.click(trigger);

    const menu = screen.getByRole('menu');
    expect(menu).toBeInTheDocument();
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });
});
