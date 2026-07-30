import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Text from '../Text';

import Modal from './Modal';

const meta = {
  title: 'GlamUI/Modal',
  component: Modal,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Modal',
    onCancel: fn(),
    onConfirm: fn(),
    children: <Text>Content</Text>,
  },
};
