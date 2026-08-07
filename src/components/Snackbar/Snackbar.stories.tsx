import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Snackbar from './Snackbar';

const meta = {
  title: 'GlamUI/Snackbar',
  component: Snackbar,
} satisfies Meta<typeof Snackbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    message: 'Note archived',
  },
};

export const WithAction: Story = {
  args: {
    open: true,
    message: 'Note archived',
    action: { label: 'Undo', onClick: fn() },
    dismissible: true,
    onClose: fn(),
  },
};

export const Variants: Story = {
  args: {
    open: true,
    message: 'Changes saved',
    variant: 'success',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '64px',
        alignItems: 'center',
      }}
    >
      <Snackbar {...args} dismissible onClose={fn()} />
    </div>
  ),
};

export const ErrorVariant: Story = {
  args: {
    open: true,
    variant: 'error',
    message: 'Something went wrong',
    action: { label: 'Retry', onClick: fn() },
  },
};

export const AutoHide: Story = {
  args: {
    open: true,
    message: 'This will auto-dismiss in 3 seconds',
    autoHideDuration: 3000,
    onClose: fn(),
  },
};
