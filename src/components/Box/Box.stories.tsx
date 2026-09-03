import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../Text';

import Box from './Box';

const meta = {
  title: 'GlamUI/Box',
  component: Box,
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Box padding="md" radius="md" border background="default">
      <Text>Default box</Text>
    </Box>
  ),
};

export const Padding: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((padding) => (
        <Box key={padding} padding={padding} border radius="md">
          <Text size="sm">{padding}</Text>
        </Box>
      ))}
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['sm', 'md', 'lg', 'xl'] as const).map((radius) => (
        <Box key={radius} padding="md" radius={radius} border>
          <Text size="sm">{radius}</Text>
        </Box>
      ))}
    </div>
  ),
};

export const Background: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['default', 'subtle', 'muted', 'elevated'] as const).map((background) => (
        <Box key={background} padding="md" radius="md" border background={background}>
          <Text size="sm">{background}</Text>
        </Box>
      ))}
    </div>
  ),
};

export const BorderSide: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Box key={side} padding="md" border={side}>
          <Text size="sm">{side}</Text>
        </Box>
      ))}
    </div>
  ),
};

export const NoBorder: Story = {
  render: () => (
    <Box padding="md" radius="md" background="subtle">
      <Text>No border, subtle background</Text>
    </Box>
  ),
};

export const AsSection: Story = {
  render: () => (
    <Box as="section" padding="md" radius="md" border>
      <Text>Rendered as a &lt;section&gt;</Text>
    </Box>
  ),
};
