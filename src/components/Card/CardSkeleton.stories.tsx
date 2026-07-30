import type { Meta, StoryObj } from '@storybook/react-vite';

import CardSkeleton from './CardSkeleton';

const meta = {
  title: 'GlamUI/CardSkeleton',
  component: CardSkeleton,
  args: {
    size: 'lg',
    variant: 'product',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      control: 'select',
      options: ['product', 'collection'],
    },
  },
} satisfies Meta<typeof CardSkeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Product: Story = {};

export const Collection: Story = {
  args: {
    variant: 'collection',
    size: 'sm',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      Small - sm
      <CardSkeleton size="sm" />
      Medium - md
      <CardSkeleton size="md" />
      Large - lg
      <CardSkeleton size="lg" />
      Extra Large - xl
      <CardSkeleton size="xl" />
    </div>
  ),
};
