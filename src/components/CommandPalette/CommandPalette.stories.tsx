import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import CommandPalette from './CommandPalette';
import Button from '../Button';
import { Edit, Remove, Heart } from '../Icon';

const meta = {
  title: 'GlamUI/CommandPalette',
  component: CommandPalette,
} satisfies Meta<typeof CommandPalette>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    items: [
      { id: 'edit', label: 'Edit product', icon: <Edit size="sm" />, onSelect: () => {} },
      { id: 'delete', label: 'Delete product', icon: <Remove size="sm" />, onSelect: () => {} },
      { id: 'wishlist', label: 'Move to wishlist', icon: <Heart size="sm" />, onSelect: () => {} },
    ],
  },
};

export const Interactive: Story = {
  args: { isOpen: false, onClose: () => {}, items: [] },
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Open command palette
        </Button>
        <CommandPalette
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={[
            { id: 'edit', label: 'Edit product', onSelect: () => setIsOpen(false) },
            { id: 'delete', label: 'Delete product', onSelect: () => setIsOpen(false) },
            { id: 'wishlist', label: 'Move to wishlist', onSelect: () => setIsOpen(false) },
            { id: 'collections', label: 'Add to collection', onSelect: () => setIsOpen(false) },
          ]}
        />
      </>
    );
  },
};
