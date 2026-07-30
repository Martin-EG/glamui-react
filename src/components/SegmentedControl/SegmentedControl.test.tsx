import { render, screen, fireEvent } from '../../test-utils';

import SegmentedControl from './SegmentedControl';

const options = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
  { label: 'Table', value: 'table' },
];

describe('SegmentedControl', () => {
  it('marks the selected option as checked and the others as not', () => {
    render(
      <SegmentedControl
        options={options}
        value="list"
        onChange={jest.fn()}
        aria-label="View"
      />,
    );

    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute(
      'aria-checked',
      'false',
    );
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute(
      'aria-checked',
      'true',
    );
  });

  it('calls onChange with the clicked option value', () => {
    const handleChange = jest.fn();
    render(
      <SegmentedControl
        options={options}
        value="grid"
        onChange={handleChange}
        aria-label="View"
      />,
    );

    fireEvent.click(screen.getByRole('radio', { name: 'Table' }));
    expect(handleChange).toHaveBeenCalledWith('table');
  });

  it('moves selection with arrow keys, wrapping at the ends', () => {
    const handleChange = jest.fn();
    render(
      <SegmentedControl
        options={options}
        value="grid"
        onChange={handleChange}
        aria-label="View"
      />,
    );

    fireEvent.keyDown(screen.getByRole('radio', { name: 'Grid' }), {
      key: 'ArrowLeft',
    });
    expect(handleChange).toHaveBeenCalledWith('table');

    fireEvent.keyDown(screen.getByRole('radio', { name: 'Table' }), {
      key: 'ArrowRight',
    });
    expect(handleChange).toHaveBeenCalledWith('grid');
  });

  it('only the selected segment is tab-reachable (roving tabindex)', () => {
    render(
      <SegmentedControl
        options={options}
        value="list"
        onChange={jest.fn()}
        aria-label="View"
      />,
    );

    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute(
      'tabIndex',
      '-1',
    );
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute(
      'tabIndex',
      '0',
    );
  });
});
