import type { Meta, StoryObj } from '@storybook/react-vite';

import DateInput from './DateInput';
import type { DateInputProps } from './DateInput.types';

const meta = {
  title: 'GlamUI/DateInput',
  component: DateInput,
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

interface LabeledDateInputProps extends DateInputProps {
  hasError?: boolean;
}

const LabeledDateInput = (args: LabeledDateInputProps) => {
  const error = args.hasError ? 'Invalid date' : undefined;

  return <DateInput {...args} label="Expiration date" error={error} />;
};

export const Default: Story = {
  render: (args) => <LabeledDateInput {...args} />,
};

export const WithMinAndMaxDates: Story = {
  render: (args) => <LabeledDateInput {...args} />,
  args: {
    min: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    max: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0], // 30 days from now
  },
};

export const Error: Story = {
  render: (args) => <LabeledDateInput {...args} hasError={true} />,
};

export const Disabled: Story = {
  render: (args) => <LabeledDateInput {...args} />,
  args: {
    disabled: true,
  },
};
