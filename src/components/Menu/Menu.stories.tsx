import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Edit, Remove } from '../Icon';

import Menu from './Menu';

const meta = {
  title: 'GlamUI/Menu',
  component: Menu,
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        label: 'Menu item 1',
        onClick: fn(),
      },
      {
        label: 'Menu item 2',
        onClick: fn(),
      },
      {
        label: 'Menu item 3',
        variant: 'danger',
        onClick: fn(),
      },
    ],
  },
};

export const WithIcon: Story = {
  args: {
    items: [
      {
        label: 'Editar',
        MenuItemIcon: Edit,
        onClick: fn(),
      },
      {
        label: 'Eliminar',
        variant: 'danger',
        MenuItemIcon: Remove,
        onClick: fn(),
      },
    ],
  },
};
