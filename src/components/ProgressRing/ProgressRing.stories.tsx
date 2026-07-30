import type { Meta, StoryObj } from '@storybook/react-vite';

import ProgressRing from './ProgressRing';

const meta = {
  title: 'GlamUI/ProgressRing',
  component: ProgressRing,
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 42,
    size: 'md',
  },
};

export const Sizes: Story = {
  args: { value: 65 },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <ProgressRing value={65} size="sm" />
      <ProgressRing value={65} size="md" />
      <ProgressRing value={65} size="lg" />
    </div>
  ),
};

export const StorageQuota: Story = {
  args: { value: 94 },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <ProgressRing value={54} size="lg" label="54%" />
      <ProgressRing value={94} size="lg" label="94%" />
    </div>
  ),
};
