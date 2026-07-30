import { render, screen } from '../../test-utils';

import LoadingAnimation, { getFrameDuration } from './LoadingAnimation';

describe('LoadingAnimation', () => {
  it('stacks all frames and only displays the first frame initially', () => {
    render(<LoadingAnimation label="Signing in..." />);

    const loader = screen.getByRole('status', { name: 'Signing in...' });
    const frames = Array.from(loader.querySelectorAll('img'));

    expect(loader).toBeVisible();
    expect(loader).toHaveStyle({
      position: 'relative',
      width: '160px',
      height: '120px',
    });
    expect(frames[0]).toHaveStyle({
      position: 'absolute',
      inset: '0',
    });
    expect(frames).toHaveLength(6);
    expect(frames[0]).toHaveStyle({ opacity: '1' });

    frames.slice(1).forEach((frame) => {
      expect(frame).toHaveStyle({ opacity: '0' });
    });
  });

  it('uses the configured duration for each frame', () => {
    expect(
      Array.from({ length: 6 }, (_, index) => getFrameDuration(index)),
    ).toEqual([150, 150, 150, 150, 150, 250]);
  });
});
