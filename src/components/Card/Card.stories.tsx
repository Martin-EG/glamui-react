import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Button from '../Button';
import Text from '../Text';

import Card from './Card';

const meta = {
  title: 'GlamUI/Card',
  component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Mi maquillaje diario',
    body: 'descripcion descripcion descripcion descripcion descripcion descripcion',
  },
};

export const WithMenu: Story = {
  args: {
    title: 'Mi maquillaje diario',
    body: 'descripcion descripcion descripcion descripcion descripcion descripcion',
    options: [
      { label: 'Editar', onClick: fn() },
      { label: 'Eliminar', variant: 'danger', onClick: fn() },
    ],
  },
};

export const WithImage: Story = {
  args: {
    title: 'Mi maquillaje diario',
    body: 'descripcion descripcion descripcion descripcion descripcion descripcion',
    image: '/dog.jpg',
  },
};

export const WithFooter: Story = {
  args: {
    title: 'Mi maquillaje diario',
    body: 'descripcion descripcion descripcion descripcion descripcion descripcion',
    footer: (
      <Text weight="semibold" size="sm" color="light" align="left">
        10 productos
      </Text>
    ),
  },
};

export const Complete: Story = {
  args: {
    title: 'Sephora lipstick red 3',
    body: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <Text size="sm">Sephora • Labial</Text>
        <Text size="sm">Fecha de expiración: 31/12/2026</Text>
        <Text size="sm">Sitio de venta: Amazon</Text>
        <Text size="sm" color="light" truncate={3}>
          Notas notas notas Notas notas notas Notas notas notas Notas notas
          notas Notas notas notas Notas notas notas Notas notas notas Notas
          notas notas Notas notas notas Notas notas notas
        </Text>
      </div>
    ),
    image: '/dog.jpg',
    footer: (
      <div>
        <Button
          variant="outline"
          size="xs"
          aria-label="Enviar a inventario"
          fullSize={true}
        >
          <Text weight="semibold" size="xs" color="light">
            Enviar a inventario
          </Text>
        </Button>
      </div>
    ),
  },
};
