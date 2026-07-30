import type { Meta, StoryObj } from '@storybook/react-vite';

import TextInput from './TextInput';

const meta = {
  title: 'GlamUI/TextInput',
  component: TextInput,
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Introduce tu nombre',
  },
};

export const Error: Story = {
  args: {
    label: 'Nombre',
    placeholder: 'Introduce tu nombre',
    error: 'Error de nombre',
  },
};
