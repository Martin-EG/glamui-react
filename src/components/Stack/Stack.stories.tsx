import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../Text';

import Stack from './Stack';

const meta = {
  title: 'GlamUI/Stack',
  component: Stack,
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Chip = ({ children }: { children: string }) => (
  <div style={{ padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6 }}>
    <Text size="sm">{children}</Text>
  </div>
);

export const Default: Story = {
  render: () => (
    <Stack>
      <Chip>One</Chip>
      <Chip>Two</Chip>
      <Chip>Three</Chip>
    </Stack>
  ),
};

export const Direction: Story = {
  render: () => (
    <Stack direction="row" gap="md">
      <Chip>Row</Chip>
      <Chip>Layout</Chip>
      <Chip>Items</Chip>
    </Stack>
  ),
};

export const Gap: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gap) => (
        <Stack key={gap} direction="row" gap={gap}>
          <Chip>{gap}</Chip>
          <Chip>{gap}</Chip>
        </Stack>
      ))}
    </div>
  ),
};

export const Align: Story = {
  render: () => (
    <Stack direction="row" gap="md" align="center" style={{ height: 80, border: '1px dashed #ccc' }}>
      <Chip>Centered</Chip>
      <Chip>Vertically</Chip>
    </Stack>
  ),
};

export const Justify: Story = {
  render: () => (
    <Stack
      direction="row"
      gap="md"
      justify="between"
      style={{ width: 320, border: '1px dashed #ccc' }}
    >
      <Chip>Start</Chip>
      <Chip>End</Chip>
    </Stack>
  ),
};

export const Wrap: Story = {
  render: () => (
    <Stack direction="row" gap="sm" wrap style={{ width: 160, border: '1px dashed #ccc' }}>
      <Chip>One</Chip>
      <Chip>Two</Chip>
      <Chip>Three</Chip>
      <Chip>Four</Chip>
    </Stack>
  ),
};

export const AsForm: Story = {
  render: () => (
    <Stack as="form" gap="sm" onSubmit={(e) => e.preventDefault()}>
      <Chip>Rendered as a &lt;form&gt;</Chip>
    </Stack>
  ),
};
