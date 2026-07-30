import type { Meta, StoryObj } from '@storybook/react-vite';

import Tooltip from './Tooltip';
import Button from '../Button';
import IconButton from '../IconButton';
import { Edit } from '../Icon';

const meta = {
  title: 'GlamUI/Tooltip',
  component: Tooltip,
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Edit this product',
    placement: 'top',
    children: <Button variant="outline">Hover or focus me</Button>,
  },
};

export const OnIconButton: Story = {
  args: {
    label: 'Edit',
    placement: 'bottom',
    children: <IconButton icon={<Edit />} label="Edit" />,
  },
};

export const Placements: Story = {
  args: {
    label: 'Placement demo',
    children: <Button>demo</Button>,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 48,
        padding: 48,
        alignItems: 'center',
      }}
    >
      {(['top', 'bottom', 'left', 'right'] as const).map((placement) => (
        <Tooltip key={placement} label={`Placement: ${placement}`} placement={placement}>
          <Button variant="outline">{placement}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};
