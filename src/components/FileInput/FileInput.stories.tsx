import type { Meta, StoryObj } from '@storybook/react-vite';

import FileInput from './FileInput';
import type { FileInputProps } from './FileInput.types';

const meta = {
  title: 'GlamUI/FileInput',
  component: FileInput,
} satisfies Meta<typeof FileInput>;

export default meta;
type Story = StoryObj<typeof meta>;

const LabeledFileInput = (args: FileInputProps) => (
  <FileInput {...args} label={args.label ?? 'Product photo'} />
);

export const Default: Story = {
  render: (args) => <LabeledFileInput {...args} />,
};

export const MultipleFiles: Story = {
  render: (args) => <LabeledFileInput {...args} />,
  args: {
    multiple: true,
  },
};

export const Error: Story = {
  render: (args) => <LabeledFileInput {...args} />,
  args: {
    error: 'Upload a product photo',
  },
};

export const Disabled: Story = {
  render: (args) => <LabeledFileInput {...args} />,
  args: {
    disabled: true,
  },
};
