import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Image } from '../Icon';
import Text from '../Text';

import Button from './Button';

const meta = {
  title: 'GlamUI/Button',
  component: Button,
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    'aria-label': 'Iniciar sesión',
    onClick: fn(),
  },
  render: (args) => (
    <Button {...args} aria-label="Iniciar sesión">
      Iniciar sesión
    </Button>
  ),
};

export const Variants: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Variants:
      </Text>
      <Button {...args} variant="primary" aria-label="Primary">
        Primary
      </Button>
      <Button {...args} variant="secondary" aria-label="Secondary">
        Secondary
      </Button>
      <Button {...args} variant="outline" aria-label="Outline">
        Outline
      </Button>
      <Button {...args} variant="danger" aria-label="Danger">
        Danger
      </Button>
      <Button {...args} variant="transparent" aria-label="Transparent">
        Transparent
      </Button>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Sizes:
      </Text>
      <Button {...args} size="xs" aria-label="Extra Small">
        Extra Small
      </Button>
      <Button {...args} size="sm" aria-label="Small">
        Small
      </Button>
      <Button {...args} size="md" aria-label="Medium">
        Medium
      </Button>
      <Button {...args} size="lg" aria-label="Large">
        Large
      </Button>
    </div>
  ),
};

export const Rounded: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <Text as="h3" variant="heading" weight="bold">
        Rounded:
      </Text>
      <Button {...args} rounded="semi" aria-label="Semi Rounded">
        Semi Rounded
      </Button>
      <Button {...args} rounded="full" aria-label="Full Rounded">
        Full Rounded
      </Button>
    </div>
  ),
};

export const States: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Text as="h3" variant="heading" weight="bold">
        States:
      </Text>
      <Button {...args} disabled aria-label="Disabled">
        Disabled
      </Button>
    </div>
  ),
};

export const FullSize: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Text as="h3" variant="heading" weight="bold">
        States:
      </Text>
      <Button {...args} fullSize aria-label="Full size">
        Full size
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  args: {
    'aria-label': 'Button',
  },
  render: (args) => (
    <div style={{ display: 'flex', gap: '20px' }}>
      <Text as="h3" variant="heading" weight="bold">
        With icon:
      </Text>
      <Button {...args} icon={<Image />} aria-label="Upload image">
        Upload image
      </Button>
      <Button
        {...args}
        icon={<Image />}
        iconPosition="end"
        aria-label="Upload image"
      >
        Upload image
      </Button>
    </div>
  ),
};
