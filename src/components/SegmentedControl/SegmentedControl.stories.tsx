import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import SegmentedControl from './SegmentedControl';

const meta = {
  title: 'GlamUI/SegmentedControl',
  component: SegmentedControl,
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

const twoOptions = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
];

const threeOptions = [
  { label: 'All', value: 'all' },
  { label: 'Wishlist', value: 'wishlist' },
  { label: 'Collections', value: 'collections' },
];

export const Default: Story = {
  args: {
    options: twoOptions,
    value: 'grid',
    onChange: () => {},
    'aria-label': 'View',
  },
  render: () => {
    const [value, setValue] = useState('grid');

    return (
      <SegmentedControl
        options={twoOptions}
        value={value}
        onChange={setValue}
        aria-label="View"
      />
    );
  },
};

export const ThreeOptions: Story = {
  args: {
    options: threeOptions,
    value: 'all',
    onChange: () => {},
    'aria-label': 'Filter',
  },
  render: () => {
    const [value, setValue] = useState('all');

    return (
      <SegmentedControl
        options={threeOptions}
        value={value}
        onChange={setValue}
        aria-label="Filter"
      />
    );
  },
};
