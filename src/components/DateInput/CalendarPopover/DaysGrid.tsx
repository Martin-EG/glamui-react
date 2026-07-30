import { FC } from 'react';

import { StyledDaysGrid } from '../DateInput.styles';
import { parseDate, useGetCalendarDays } from './hooks';
import DayButton from './DayButton';

interface DaysGridProps {
  readonly visibleDate: Date;
  readonly minDate?: string | number | string[];
  readonly maxDate?: string | number | string[];
  readonly selectedDate?: Date;
  readonly onDateSelect: (date: Date) => void;
}

const DaysGrid: FC<DaysGridProps> = ({
  visibleDate,
  minDate,
  maxDate,
  selectedDate,
  onDateSelect,
}) => {
  const calendarDays = useGetCalendarDays(visibleDate);
  const minDateParsed = parseDate(minDate);
  const maxDateParsed = parseDate(maxDate);

  const days = calendarDays.map((calendarDay) => (
    <DayButton
      key={calendarDay.key}
      calendarDay={calendarDay}
      minDate={minDateParsed}
      maxDate={maxDateParsed}
      selectedDate={selectedDate}
      onDateSelect={onDateSelect}
    />
  ));

  return <StyledDaysGrid>{days}</StyledDaysGrid>;
};

export default DaysGrid;
