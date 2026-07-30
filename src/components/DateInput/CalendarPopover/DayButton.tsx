import { FC } from 'react';

import { CalendarDay, formatDate, isSameDay } from './hooks';
import { EmptyDay, StyledDayButton } from '../DateInput.styles';

interface DayButtonProps {
  readonly calendarDay: CalendarDay;
  readonly selectedDate?: Date;
  readonly minDate?: Date;
  readonly maxDate?: Date;
  readonly onDateSelect: (date: Date) => void;
}

const DayButton: FC<DayButtonProps> = ({
  calendarDay,
  selectedDate,
  minDate,
  maxDate,
  onDateSelect,
}) => {
  const today = new Date();

  if (calendarDay.type === 'empty' || !calendarDay.date) {
    return <EmptyDay data-testid="empty-day" />;
  }

  const isBeforeMin = !!minDate && calendarDay.date < minDate;
  const isAfterMax = !!maxDate && calendarDay.date > maxDate;
  const isToday = isSameDay(calendarDay.date, today);
  const isSelected = isSameDay(calendarDay.date, selectedDate);
  const shouldDisable = isBeforeMin || isAfterMax;

  return (
    <StyledDayButton
      type="button"
      $isSelected={isSelected}
      $isToday={isToday}
      disabled={shouldDisable}
      aria-label={formatDate(calendarDay.date)}
      onClick={() => onDateSelect(calendarDay.date as Date)}
    >
      {calendarDay.date.getDate()}
    </StyledDayButton>
  );
};

export default DayButton;
