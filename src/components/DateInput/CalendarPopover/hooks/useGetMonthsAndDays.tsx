const DEFAULT_MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const DEFAULT_WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

type MonthsAndDays = {
  monthNames: string[];
  weekdays: string[];
};

type UseGetMonthsAndDays = (overrides?: {
  monthNames?: string[];
  weekdays?: string[];
}) => MonthsAndDays;

export const useGetMonthsAndDays: UseGetMonthsAndDays = (overrides) => {
  const monthNames = overrides?.monthNames ?? DEFAULT_MONTH_NAMES;
  const weekdays = (overrides?.weekdays ?? DEFAULT_WEEKDAYS).map((day) =>
    day.slice(0, 2),
  );

  return { monthNames, weekdays };
};
