import { useMemo } from 'react';

export const DATE_INPUT_MAX_LENGTH = 10;
const DATE_INPUT_MAX_DIGITS = 8;

type FormatDate = (date: Date) => string;
export const formatDate: FormatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

type ParseDate = (value?: string | number | string[]) => Date | undefined;
export const parseDate: ParseDate = (value) => {
  if (typeof value !== 'string') return undefined;

  const [year, month, day] = value.split('-').map(Number);

  if (
    isNaN(year) ||
    isNaN(month) ||
    isNaN(day) ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  )
    return undefined;

  return new Date(year, month - 1, day);
};

type SanitizeDateInputValue = (nextValue: string) => string;
export const sanitizeDateInputValue: SanitizeDateInputValue = (nextValue) => {
  const digits = nextValue.replace(/\D/g, '').slice(0, DATE_INPUT_MAX_DIGITS);

  if (digits.length > 6) {
    return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6)}`;
  }

  if (digits.length > 4) {
    return `${digits.slice(0, 4)}-${digits.slice(4)}`;
  }

  return digits;
};

type IsSameDay = (dateA?: Date, dateB?: Date) => boolean;
export const isSameDay: IsSameDay = (dateA, dateB) =>
  !!dateA &&
  !!dateB &&
  dateA.getFullYear() === dateB.getFullYear() &&
  dateA.getMonth() === dateB.getMonth() &&
  dateA.getDate() === dateB.getDate();

type GetMondayBasedMonthOffset = (date: Date) => number;
export const getMondayBasedMonthOffset: GetMondayBasedMonthOffset = (date) => {
  const sundayBasedDay = date.getDay();

  return sundayBasedDay === 0 ? 6 : sundayBasedDay - 1;
};

export type CalendarDay = {
  type: 'day' | 'empty';
  key: string;
  date?: Date;
};
type UseGetCalendarDays = (visibleDate: Date) => CalendarDay[];
export const useGetCalendarDays: UseGetCalendarDays = (visibleDate) => {
  return useMemo(() => {
    const year = visibleDate.getFullYear();
    const month = visibleDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = getMondayBasedMonthOffset(firstDayOfMonth);

    const emptyDays = Array.from({ length: offset }, (_, index) => ({
      type: 'empty' as const,
      key: `empty-${index}`,
    }));

    const days = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(year, month, index + 1);

      return {
        type: 'day' as const,
        key: formatDate(date),
        date,
      };
    });

    return [...emptyDays, ...days];
  }, [visibleDate]);
};
