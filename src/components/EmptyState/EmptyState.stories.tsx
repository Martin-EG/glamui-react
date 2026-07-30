import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from '../Button';
import { Box, Search } from '../Icon';

import EmptyState from './EmptyState';

const meta = {
  title: 'GlamUI/EmptyState',
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Nothing here yet',
  },
};

export const FirstRun: Story = {
  args: {
    icon: <Box size="xl" />,
    title: 'Your collection is empty',
    description: 'Scan or add your first product to start tracking it.',
    action: <Button variant="primary">Add a product</Button>,
  },
};

export const NoSearchResults: Story = {
  args: {
    icon: <Search size="xl" />,
    title: 'No matches for "matte lipstick"',
    description: 'Try a different search term, or check your spelling.',
  },
};

export const ErrorCausedEmpty: Story = {
  args: {
    title: "Couldn't load your collection",
    description: 'Something went wrong on our end. Your data is safe.',
    action: <Button variant="outline">Try again</Button>,
  },
};
