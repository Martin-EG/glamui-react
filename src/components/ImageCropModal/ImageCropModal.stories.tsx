import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import ImageCropModal from './ImageCropModal';

const meta = {
  title: 'GlamUI/ImageCropModal',
  component: ImageCropModal,
} satisfies Meta<typeof ImageCropModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: '/dog.jpg',
    onCancel: fn(),
    onConfirm: fn(),
  },
};
