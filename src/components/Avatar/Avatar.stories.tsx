import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Text from '../Text/Text';

import Avatar from './Avatar';

const meta = {
  title: 'GlamUI/Avatar',
  component: Avatar,
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: '/dog.jpg',
    alt: 'Foto de perfil',
    size: 'lg',
  },
};

export const Placeholder: Story = {
  args: {
    alt: 'Foto de perfil',
    size: 'lg',
  },
};

export const Editable: Story = {
  args: {
    src: '/dog.jpg',
    alt: 'Foto de perfil',
    size: 'lg',
    editable: true,
    onClick: fn(),
  },
};

export const Loading: Story = {
  args: {
    src: '/dog.jpg',
    alt: 'Foto de perfil',
    size: 'lg',
    loading: true,
  },
};

export const Sizes: Story = {
  args: {
    src: '/dog.jpg',
    alt: 'Foto de perfil',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Sizes:
      </Text>
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
