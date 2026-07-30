import type { Meta, StoryObj } from '@storybook/react-vite';

import Text from '../Text/Text';

import { IconSize, iconSizes } from './Icon.types';
import {
  Box,
  Calendar,
  Camera,
  Close,
  Edit,
  Exit,
  Eye,
  EyeOff,
  Heart,
  Image,
  Remove,
  Search,
  Star,
  Upload,
  User,
} from '.';

const meta = {
  title: 'GlamUI/Icon',
} satisfies Meta<typeof Camera>;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  { name: 'Box', icon: Box },
  { name: 'Calendar', icon: Calendar },
  { name: 'Camera', icon: Camera },
  { name: 'Close', icon: Close },
  { name: 'Edit', icon: Edit },
  { name: 'Exit', icon: Exit },
  { name: 'Eye', icon: Eye },
  { name: 'EyeOff', icon: EyeOff },
  { name: 'Heart', icon: Heart },
  { name: 'Image', icon: Image },
  { name: 'Remove', icon: Remove },
  { name: 'Search', icon: Search },
  { name: 'Star', icon: Star },
  { name: 'Upload', icon: Upload },
  { name: 'User', icon: User },
];

const sizes: IconSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];
const colors = ['black', 'red', 'blue'];

export const Default: Story = {
  render: () => (
    <>
      <Text as="h3" variant="heading" weight="bold">
        Icons:
      </Text>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        {icons.map((icon) => (
          <div
            key={icon.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <icon.icon />
            <Text weight="semibold">{icon.name}</Text>
          </div>
        ))}
      </div>
    </>
  ),
};

export const Sizes: Story = {
  render: () => (
    <>
      <Text as="h3" variant="heading" weight="bold">
        Sizes:
      </Text>
      <div
        style={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
        }}
      >
        {sizes.map((size) => (
          <div
            key={size}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              justifyContent: 'center',
            }}
          >
            <Eye size={size} />
            <Text weight="semibold">
              {size} - {iconSizes[size]}px {size === 'xs' ? ' (default)' : ''}
            </Text>
          </div>
        ))}
      </div>
    </>
  ),
};

export const Colors: Story = {
  render: () => (
    <>
      <Text as="h3" variant="heading" weight="bold">
        Colors:
      </Text>
      <div
        style={{
          marginTop: '10px',
          display: 'flex',
          gap: '15px',
          alignItems: 'center',
        }}
      >
        {colors.map((color) => (
          <div
            key={color}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Eye color={color} />
            <Text weight="semibold">{color}</Text>
          </div>
        ))}
      </div>
    </>
  ),
};
