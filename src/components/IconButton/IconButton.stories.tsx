import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Image } from '../Icon';

import IconButton from './IconButton';

const meta = {
  title: 'GlamUI/IconButton',
  component: IconButton,
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Image />,
    label: 'Upload image',
    onClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    icon: <Image />,
    label: 'Upload image',
    onClick: fn(),
    disabled: true,
  },
};
