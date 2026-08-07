import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../Text/Text';

import Badge from './Badge';

const meta = {
  title: 'GlamUI/Badge',
  component: Badge,
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 3,
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Variants:
      </Text>
      <Badge variant="default">1</Badge>
      <Badge variant="brand">2</Badge>
      <Badge variant="success">3</Badge>
      <Badge variant="warning">4</Badge>
      <Badge variant="error">5</Badge>
      <Badge variant="info">6</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Sizes:
      </Text>
      <Badge size="sm">3</Badge>
      <Badge size="md">3</Badge>
    </div>
  ),
};

export const MaxCount: Story = {
  args: {
    variant: 'error',
    max: 99,
    children: 150,
    label: '99 plus unread messages',
  },
};

export const Dot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Dot:
      </Text>
      <Badge dot variant="error" label="New notifications" />
      <Badge dot variant="success" label="Online" />
    </div>
  ),
};
