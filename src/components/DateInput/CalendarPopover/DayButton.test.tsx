import { render, screen, fireEvent } from '../../../test-utils';

import DayButton from './DayButton';
import { CalendarDay } from './hooks';

describe('DayButton', () => {
  const onDateSelectMock = jest.fn();
  const calendarDay = {
    type: 'day',
    key: '2026-05-27',
    date: new Date(2026, 4, 27),
  } as CalendarDay;

  afterEach(() => {
    onDateSelectMock.mockClear();
  });

  it('renders an empty day', () => {
    render(
      <DayButton
        calendarDay={{ type: 'empty', key: 'empty-0' }}
        onDateSelect={onDateSelectMock}
      />,
    );

    expect(screen.getByTestId('empty-day')).toBeInTheDocument();
  });

  it('renders a day button', () => {
    render(
      <DayButton calendarDay={calendarDay} onDateSelect={onDateSelectMock} />,
    );

    const button = screen.getByRole('button', { name: calendarDay.key });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('27');
  });

  it('disables the button for dates before minDate', () => {
    const minDate = new Date(2026, 4, 28);

    render(
      <DayButton
        calendarDay={calendarDay}
        minDate={minDate}
        onDateSelect={onDateSelectMock}
      />,
    );

    const button = screen.getByRole('button', { name: calendarDay.key });

    expect(button).toBeDisabled();
  });

  it('disables the button for dates after maxDate', () => {
    const maxDate = new Date(2026, 4, 26);

    render(
      <DayButton
        calendarDay={calendarDay}
        maxDate={maxDate}
        onDateSelect={onDateSelectMock}
      />,
    );

    const button = screen.getByRole('button', { name: calendarDay.key });

    expect(button).toBeDisabled();
  });

  it('calls onDateSelect when a date is clicked', () => {
    render(
      <DayButton calendarDay={calendarDay} onDateSelect={onDateSelectMock} />,
    );

    const button = screen.getByRole('button', { name: calendarDay.key });
    fireEvent.click(button);
    expect(onDateSelectMock).toHaveBeenCalledWith(calendarDay.date);
  });
});
