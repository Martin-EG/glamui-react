import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from './Text';

const meta = {
  title: 'GlamUI/Text',
  component: Text,
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Text',
  },
};

export const Variants: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold">
        Variants:
      </Text>
      <Text {...args} variant="heading" weight="bold">
        Heading
      </Text>
      <Text {...args} variant="subheading" weight="bold">
        Subheading
      </Text>
      <Text {...args} variant="body" weight="bold">
        Body
      </Text>
      <Text {...args} variant="caption" weight="bold">
        Caption
      </Text>
    </div>
  ),
};

export const Weights: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold">
        Weights:
      </Text>
      <Text {...args} variant="heading" weight="bold">
        Bold
      </Text>
      <Text {...args} variant="heading" weight="medium">
        Medium
      </Text>
      <Text {...args} variant="heading" weight="regular">
        Regular
      </Text>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Sizes:
      </Text>
      <Text {...args} size="xxl">
        Extra Large
      </Text>
      <Text {...args} size="xl">
        Large
      </Text>
      <Text {...args} size="lg">
        Medium
      </Text>
      <Text {...args} size="md">
        Small
      </Text>
      <Text {...args} size="sm">
        Extra Small
      </Text>
    </div>
  ),
};

export const Colors: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Colors:
      </Text>
      <Text {...args} weight="bold" color="default">
        Default
      </Text>
      <Text {...args} weight="bold" color="light">
        Light
      </Text>
      <Text {...args} weight="bold" color="muted">
        Muted
      </Text>
      <Text {...args} weight="bold" color="brand">
        Brand
      </Text>
      <Text {...args} weight="bold" color="brandSecondary">
        Brand Secondary
      </Text>
      <Text {...args} weight="bold" color="danger">
        Danger
      </Text>
      <Text {...args} weight="bold" color="error">
        Error
      </Text>
      <Text {...args} weight="bold" color="success">
        Success
      </Text>
      <Text {...args} weight="bold" color="warning">
        Warning
      </Text>
      <Text {...args} weight="bold" color="info">
        Info
      </Text>
    </div>
  ),
};

export const TextAlign: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Text Align:
      </Text>
      <Text {...args} variant="heading" weight="bold" align="left">
        Left
      </Text>
      <Text {...args} variant="heading" weight="bold" align="center">
        Center
      </Text>
      <Text {...args} variant="heading" weight="bold" align="right">
        Right
      </Text>
    </div>
  ),
};

export const Code: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Code:
      </Text>
      <Text {...args} as="code">
        const glamui = &apos;great&apos;;
      </Text>
    </div>
  ),
};

export const CustomStyling: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Custom styling (className / style passthrough):
      </Text>
      <Text {...args} style={{ marginTop: 8, textDecoration: 'underline' }}>
        Styled via the style prop
      </Text>
    </div>
  ),
};

export const TextTruncated: Story = {
  args: {
    children: 'Text',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '5px', flexDirection: 'column' }}>
      <Text {...args} variant="heading" weight="bold" size="xl">
        Text Truncated:
      </Text>

      <div
        style={{ width: '150px', border: '1px solid black', padding: '5px' }}
      >
        <Text {...args} variant="heading" weight="bold" truncate={false}>
          This is a long text that will not be truncated This is a long text
          that will not be truncated
        </Text>
      </div>

      <div
        style={{ width: '150px', border: '1px solid black', padding: '5px' }}
      >
        <Text {...args} variant="heading" weight="bold" truncate={true}>
          This is a long text that will be truncated
        </Text>
      </div>

      <div
        style={{ width: '150px', border: '1px solid black', padding: '5px' }}
      >
        <Text {...args} variant="heading" weight="bold" truncate={5}>
          This is a long text that will be truncated in just 5 rows This is a
          long text that will be truncated in just 5 rows This is a long text
          that will be truncated in just 5 rows
        </Text>
      </div>
    </div>
  ),
};
