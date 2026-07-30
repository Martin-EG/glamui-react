import type { Meta, StoryObj } from '@storybook/react-vite';

import TextArea from './TextArea';

const meta = {
  title: 'GlamUI/TextArea',
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Describe el producto',
  },
};

export const Error: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Describe el producto',
    error: 'La descripción es requerida',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Describe el producto',
    disabled: true,
  },
};
