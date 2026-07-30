import type { Meta, StoryObj } from '@storybook/react-vite';

import Select from './Select';

const productOptions = [
  { label: 'Maquillaje', value: 'makeup' },
  { label: 'Cuidado de la piel', value: 'skincare' },
  { label: 'Perfume', value: 'fragrance' },
];

const meta = {
  title: 'GlamUI/Select',
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Tipo de producto',
    placeholder: 'Seleccione un tipo',
    options: productOptions,
    defaultValue: '',
  },
};

export const Error: Story = {
  args: {
    label: 'Tipo de producto',
    placeholder: 'Seleccione un tipo',
    options: productOptions,
    defaultValue: '',
    error: 'Selecciona un tipo de producto',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Tipo de producto',
    placeholder: 'Seleccione un tipo',
    options: productOptions,
    defaultValue: '',
    disabled: true,
  },
};
