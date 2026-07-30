import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import Text from '../Text/Text';

import MessageBar from './MessageBar';

const meta = {
  title: 'GlamUI/MessageBar',
  component: MessageBar,
} satisfies Meta<typeof MessageBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    message: 'Mensaje de prueba',
  },
};

export const Variants: Story = {
  args: {
    message: 'Mensaje de prueba',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Variants:
      </Text>
      <MessageBar {...args} variant="error" message="Error" />
      <MessageBar {...args} variant="success" message="Success" />
      <MessageBar {...args} variant="warning" message="Warning" />
      <MessageBar {...args} variant="info" message="Info" />
    </div>
  ),
};

export const Dismissible: Story = {
  args: {
    message: 'Mensaje de prueba',
    dismissible: true,
    dismissMessageBar: fn(),
  },
};
