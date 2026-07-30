import { render, screen } from '../../test-utils';

import ProgressRing from './ProgressRing';

describe('ProgressRing', () => {
  it('exposes value via role=progressbar and ARIA value attributes', () => {
    render(<ProgressRing value={42} />);

    const ring = screen.getByRole('progressbar');
    expect(ring).toHaveAttribute('aria-valuenow', '42');
    expect(ring).toHaveAttribute('aria-valuemin', '0');
    expect(ring).toHaveAttribute('aria-valuemax', '100');
  });

  it('shows the percentage as the default label', () => {
    render(<ProgressRing value={73} />);

    expect(screen.getByText('73%')).toBeInTheDocument();
  });

  it('accepts a custom label', () => {
    render(<ProgressRing value={73} label="3/4 done" />);

    expect(screen.getByText('3/4 done')).toBeInTheDocument();
    expect(screen.queryByText('73%')).not.toBeInTheDocument();
  });

  it('clamps out-of-range values', () => {
    render(<ProgressRing value={150} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute(
      'aria-valuenow',
      '100',
    );

    render(<ProgressRing value={-20} />);
    expect(screen.getAllByRole('progressbar')[1]).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });
});
