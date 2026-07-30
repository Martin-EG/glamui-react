import { Dispatch, forwardRef, SetStateAction } from 'react';
import {
  CalendarHeader,
  StyledCalendarPopover,
  MonthLabel,
  NavButton,
  Weekday,
  WeekdayGrid,
} from '../DateInput.styles';
import DaysGrid from './DaysGrid';
import { useGetMonthsAndDays } from './hooks';

interface CalendarPopoverProps {
  readonly inputId: string;
  readonly minDate?: string | number | string[];
  readonly maxDate?: string | number | string[];
  readonly selectedDate?: Date;
  readonly position?: {
    readonly left: number;
    readonly top: number;
  };
  readonly visibleDate: Date;
  readonly onDateSelect: (date: Date) => void;
  readonly setVisibleDate: Dispatch<SetStateAction<Date>>;
  readonly ariaLabel?: string;
  readonly previousMonthLabel?: string;
  readonly nextMonthLabel?: string;
  readonly monthNames?: string[];
  readonly weekdayNames?: string[];
}

const CalendarPopover = forwardRef<HTMLDivElement, CalendarPopoverProps>(
  (
    {
      inputId,
      position,
      visibleDate,
      setVisibleDate,
      ariaLabel = 'Calendar',
      previousMonthLabel = 'Previous month',
      nextMonthLabel = 'Next month',
      monthNames: monthNamesOverride,
      weekdayNames,
      ...props
    },
    ref,
  ) => {
    const { monthNames, weekdays } = useGetMonthsAndDays({
      monthNames: monthNamesOverride,
      weekdays: weekdayNames,
    });

    const moveMonth = (amount: number) => {
      setVisibleDate(
        (currentMonth: Date) =>
          new Date(
            currentMonth.getFullYear(),
            currentMonth.getMonth() + amount,
            1,
          ),
      );
    };

    return (
      <StyledCalendarPopover
        id={`${inputId}-calendar`}
        ref={ref}
        aria-label={ariaLabel}
        role="dialog"
        tabIndex={-1}
        $left={position?.left}
        $top={position?.top}
      >
        <CalendarHeader>
          <NavButton
            type="button"
            aria-label={previousMonthLabel}
            onClick={() => moveMonth(-1)}
          >
            {'<'}
          </NavButton>
          <MonthLabel>
            {monthNames[visibleDate.getMonth()]} {visibleDate.getFullYear()}
          </MonthLabel>
          <NavButton
            type="button"
            aria-label={nextMonthLabel}
            onClick={() => moveMonth(1)}
          >
            {'>'}
          </NavButton>
        </CalendarHeader>

        <WeekdayGrid>
          {weekdays.map((weekday) => (
            <Weekday key={weekday}>{weekday}</Weekday>
          ))}
        </WeekdayGrid>

        <DaysGrid visibleDate={visibleDate} {...props} />
      </StyledCalendarPopover>
    );
  },
);

CalendarPopover.displayName = 'CalendarPopover';

export default CalendarPopover;
