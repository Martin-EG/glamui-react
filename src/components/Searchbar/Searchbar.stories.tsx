import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ChangeEvent, useState } from 'react';

import Searchbar from './Searchbar';
import type { SearchbarProps } from './Searchbar.types';

const meta = {
  title: 'GlamUI/Searchbar',
  component: Searchbar,
} satisfies Meta<typeof Searchbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const SearchbarWithState = (args: SearchbarProps) => {
  const [value, setValue] = useState(args.value);
  return (
    <Searchbar
      {...args}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        args.onChange(e);
      }}
      onClear={() => {
        setValue('');
      }}
    />
  );
};

export const Default: Story = {
  args: {
    value: '',
    onChange: fn(),
    onClear: fn(),
  },
  render: SearchbarWithState,
};
