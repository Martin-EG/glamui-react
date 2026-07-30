import { render, screen } from '../../test-utils';

import LoadingOverlay from './LoadingOverlay';

describe('LoadingOverlay', () => {
  it('covers the viewport and renders the loading animation by default', () => {
    render(<LoadingOverlay label="Signing in..." />);

    expect(screen.getByTestId('loading-overlay')).toHaveStyle({
      position: 'fixed',
      inset: '0',
      zIndex: '1000',
    });
    expect(
      screen.getByRole('status', { name: 'Signing in...' }),
    ).toBeInTheDocument();
  });

  it('can cover a positioned container', () => {
    render(<LoadingOverlay label="Loading page" fullScreen={false} />);

    expect(screen.getByTestId('loading-overlay')).toHaveStyle({
      position: 'absolute',
    });
  });
});
