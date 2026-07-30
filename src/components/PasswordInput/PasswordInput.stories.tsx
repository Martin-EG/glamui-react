import type { Meta, StoryObj } from '@storybook/react-vite';

import PasswordInput from './PasswordInput';

const meta = {
  title: 'GlamUI/PasswordInput',
  component: PasswordInput,
} satisfies Meta<typeof PasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Contraseña',
    placeholder: 'Introduce tu contraseña',
  },
};

export const WithError: Story = {
  args: {
    label: 'Contraseña',
    error: 'Error de contraseña',
    placeholder: 'Introduce tu contraseña',
  },
};
