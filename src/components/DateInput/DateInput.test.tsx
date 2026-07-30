import type { ComponentProps } from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';

import DateInput from './DateInput';

const calendar = {
  months: {
    '0': 'January',
    '1': 'February',
    '2': 'March',
    '3': 'April',
    '4': 'May',
    '5': 'June',
    '6': 'July',
    '7': 'August',
    '8': 'September',
    '9': 'October',
    '10': 'November',
    '11': 'December',
  },
  label: 'Calendar',
  openCalendar: 'Open calendar',
  errorInvalidDate: 'Invalid date',
};

describe('DateInput', () => {
  const expirationDateLabel = 'Expiration date';
  const may2026CalendarLabel = `${calendar.months['4']} 2026`;

  const renderDateInput = (props: ComponentProps<typeof DateInput> = {}) =>
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-27"
        {...props}
      />,
    );

  const openCalendar = () => {
    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );
  };

  const expectMay2026CalendarToBeOpen = () => {
    expect(screen.getByText(may2026CalendarLabel)).toBeInTheDocument();
  };

  const expectMay2026CalendarToBeClosed = () => {
    expect(screen.queryByText(may2026CalendarLabel)).not.toBeInTheDocument();
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders date input correctly', () => {
    renderDateInput({ defaultValue: undefined });

    const input = screen.getByLabelText(expirationDateLabel);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('inputmode', 'numeric');
  });

  it('renders error message and aria attributes', () => {
    renderDateInput({
      id: 'expiration-date',
      defaultValue: undefined,
      error: calendar.errorInvalidDate,
    });

    const input = screen.getByLabelText(expirationDateLabel);
    const errorMessage = screen.getByText(calendar.errorInvalidDate);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'expiration-date-error');
    expect(errorMessage).toHaveAttribute('id', 'expiration-date-error');
  });

  it('handles disabled state', () => {
    renderDateInput({ disabled: true, defaultValue: undefined });

    expect(screen.getByLabelText(expirationDateLabel)).toBeDisabled();
  });

  it('passes change events to input element', () => {
    const handleChange = jest.fn();
    renderDateInput({ defaultValue: undefined, onChange: handleChange });

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '2026-05-27' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('filters typed letters from the input value', () => {
    const handleChange = jest.fn();
    renderDateInput({ defaultValue: undefined, onChange: handleChange });

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: 'abc20260515xyz' },
    });

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-15',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('renders without label and error text', () => {
    render(<DateInput data-testid="date-input" />);

    expect(screen.getByTestId('date-input')).toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('keeps controlled value when selecting a calendar date', () => {
    const handleChange = jest.fn();
    renderDateInput({
      defaultValue: undefined,
      value: '2026-05-27',
      onChange: handleChange,
    });

    openCalendar();
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-27',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('handles typed date changes for controlled inputs', () => {
    const handleChange = jest.fn();
    renderDateInput({
      defaultValue: undefined,
      value: '2026-05-27',
      onChange: handleChange,
    });

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '2026-06-12' },
    });
    openCalendar();

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-27',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
    expectMay2026CalendarToBeOpen();
  });

  it('selects a date when no onChange handler is provided', () => {
    renderDateInput();

    openCalendar();
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-15',
    );
  });

  it('handles typed invalid date values without moving the visible month', () => {
    const handleChange = jest.fn();
    renderDateInput({ onChange: handleChange });

    fireEvent.change(screen.getByLabelText(expirationDateLabel), {
      target: { value: '' },
    });
    openCalendar();

    expect(handleChange).toHaveBeenCalledTimes(1);
    expectMay2026CalendarToBeOpen();
  });

  it('opens calendar when clicking the calendar icon', () => {
    renderDateInput();

    openCalendar();

    expectMay2026CalendarToBeOpen();
    expect(
      screen.getByRole('button', { name: '2026-05-27' }),
    ).toBeInTheDocument();
  });

  it('closes calendar from the icon, Escape key and outside clicks', () => {
    renderDateInput();

    const calendarButton = screen.getByRole('button', {
      name: calendar.openCalendar,
    });

    fireEvent.click(calendarButton);
    fireEvent.click(calendarButton);
    expectMay2026CalendarToBeClosed();

    fireEvent.click(calendarButton);
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    expectMay2026CalendarToBeClosed();

    fireEvent.click(calendarButton);
    fireEvent.pointerDown(document.body);
    expectMay2026CalendarToBeClosed();
  });

  it('moves focus into the calendar when opened from the calendar icon', async () => {
    renderDateInput();

    openCalendar();

    await waitFor(() => {
      expect(
        screen.getByRole('dialog', { name: calendar.label }),
      ).toHaveFocus();
    });
  });

  it('opens calendar from input click and focus events', () => {
    const handleClick = jest.fn();
    const handleFocus = jest.fn();
    renderDateInput({ onClick: handleClick, onFocus: handleFocus });

    fireEvent.click(screen.getByLabelText(expirationDateLabel));

    expect(handleClick).toHaveBeenCalledTimes(1);
    expectMay2026CalendarToBeOpen();

    fireEvent.click(
      screen.getByRole('button', { name: calendar.openCalendar }),
    );

    fireEvent.focus(screen.getByLabelText(expirationDateLabel));

    expect(handleFocus).toHaveBeenCalledTimes(1);
    expectMay2026CalendarToBeOpen();
  });

  it('keeps calendar open for non-closing keyboard and pointer events', () => {
    renderDateInput();

    openCalendar();
    fireEvent.keyDown(document, { key: 'Enter', code: 'Enter' });
    expectMay2026CalendarToBeOpen();

    fireEvent.pointerDown(screen.getByRole('dialog'));
    expectMay2026CalendarToBeOpen();
  });

  it('opens calendar around today when no date is selected', () => {
    const today = new Date();
    const currentMonth = String(
      today.getMonth(),
    ) as keyof typeof calendar.months;

    render(<DateInput label={expirationDateLabel} />);

    openCalendar();

    expect(
      screen.getByText(
        `${calendar.months[currentMonth]} ${today.getFullYear()}`,
      ),
    ).toBeInTheDocument();
  });

  it('selects a date from the calendar', () => {
    const handleChange = jest.fn();
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-27"
        onChange={handleChange}
      />,
    );

    openCalendar();
    fireEvent.click(screen.getByRole('button', { name: '2026-05-15' }));

    expect(screen.getByLabelText(expirationDateLabel)).toHaveValue(
      '2026-05-15',
    );
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(
      screen.queryByText(`${calendar.months['4']} 2026`),
    ).not.toBeInTheDocument();
  });

  it('disables dates outside min and max range', () => {
    render(
      <DateInput
        label={expirationDateLabel}
        defaultValue="2026-05-15"
        min="2026-05-10"
        max="2026-05-20"
      />,
    );

    openCalendar();

    expect(screen.getByRole('button', { name: '2026-05-09' })).toBeDisabled();
    expect(screen.getByRole('button', { name: '2026-05-21' })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: '2026-05-15' }),
    ).not.toBeDisabled();
  });
});
