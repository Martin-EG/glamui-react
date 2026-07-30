import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import Avatar from './Avatar';

describe('Avatar variants', () => {
  it('renders default avatar with placeholder', () => {
    const { container } = render(<Avatar />);
    const img = screen.queryByRole('img', { name: /avatar/i });
    expect(img).not.toBeInTheDocument();

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle('width: 72px');
    expect(root).toHaveStyle('height: 72px');
  });

  it('renders avatar with image', () => {
    const testSrc = 'test-image.jpg';
    const testAlt = 'User Profile';
    render(<Avatar src={testSrc} alt={testAlt} />);

    const image = screen.getByRole('img', { name: testAlt });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testSrc);
  });

  it('renders small size', () => {
    const { container: smContainer } = render(<Avatar size="sm" />);
    const smRoot = smContainer.firstChild as HTMLElement;
    expect(smRoot).toHaveStyle('width: 40px');
    expect(smRoot).toHaveStyle('height: 40px');
  });

  it('renders medium size', () => {
    const { container: mdContainer } = render(<Avatar size="md" />);
    const mdRoot = mdContainer.firstChild as HTMLElement;
    expect(mdRoot).toHaveStyle('width: 72px');
    expect(mdRoot).toHaveStyle('height: 72px');
  });

  it('renders large size', () => {
    const { container: lgContainer } = render(<Avatar size="lg" />);
    const lgRoot = lgContainer.firstChild as HTMLElement;
    expect(lgRoot).toHaveStyle('width: 120px');
    expect(lgRoot).toHaveStyle('height: 120px');
  });
});

describe('Avatar interaction', () => {
  it('renders as a button when editable and onClick is provided', () => {
    const handleClick = jest.fn();
    render(<Avatar editable onClick={handleClick} src="user.jpg" />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAccessibleName(
      'Change profile picture',
    );

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);

    expect(button).toHaveStyle('cursor: pointer');
  });

  it('does not render as a button when editable is false', () => {
    const handleClick = jest.fn();
    const { container } = render(
      <Avatar onClick={handleClick} src="user.jpg" />,
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    const root = container.firstChild as HTMLElement;
    expect(root).toHaveStyle('cursor: default');
  });

  it('does not render as a button when onClick is missing', () => {
    render(<Avatar editable src="user.jpg" />);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});

describe('Avatar loading state', () => {
  it('renders skeleton when loading is true', () => {
    const { container } = render(<Avatar loading />);

    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveAttribute('aria-hidden', 'true');

    expect(skeleton).toHaveStyle('width: 72px');

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it('renders skeleton even if src is provided when loading', () => {
    render(<Avatar loading src="test.jpg" />);

    const img = screen.queryByRole('img');
    expect(img).not.toBeInTheDocument();
  });

  it('renders skeleton with correct size', () => {
    const { container } = render(<Avatar loading size="sm" />);
    const skeleton = container.firstChild as HTMLElement;
    expect(skeleton).toHaveStyle('width: 40px');
  });
});
