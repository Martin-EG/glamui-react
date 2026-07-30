jest.mock('react', () => {
  const originalReact = jest.requireActual('react');
  return {
    ...originalReact,
    useMemo: <T>(fn: () => T) => fn(),
  };
});

import {
  formatDate,
  getMondayBasedMonthOffset,
  isSameDay,
  parseDate,
  sanitizeDateInputValue,
  useGetCalendarDays,
} from './dates';

describe('dates', () => {
  describe('formatDate', () => {
    it('formats a date as YYYY-MM-DD', () => {
      const date = new Date(2026, 4, 5); // May 5, 2026

      expect(formatDate(date)).toBe('2026-05-05');
    });
  });

  describe('parseDate', () => {
    it('parses a date string in YYYY-MM-DD format', () => {
      const date = parseDate('2026-05-05');

      expect(date).toEqual(new Date(2026, 4, 5));
    });

    it('returns undefined for invalid date strings', () => {
      expect(parseDate('invalid-date')).toBeUndefined();
      expect(parseDate('2026-13-01')).toBeUndefined();
      expect(parseDate('2026-00-01')).toBeUndefined();
      expect(parseDate('2026-01-32')).toBeUndefined();
    });
  });

  describe('sanitizeDateInputValue', () => {
    it('removes letters and formats digits as a date', () => {
      expect(sanitizeDateInputValue('abc20260515xyz')).toBe('2026-05-15');
    });

    it('formats partial date values while typing', () => {
      expect(sanitizeDateInputValue('2026')).toBe('2026');
      expect(sanitizeDateInputValue('202605')).toBe('2026-05');
      expect(sanitizeDateInputValue('2026051')).toBe('2026-05-1');
    });

    it('limits the value to eight date digits', () => {
      expect(sanitizeDateInputValue('202605151234')).toBe('2026-05-15');
    });
  });

  describe('isSameDay', () => {
    it('returns true for the same day', () => {
      const dateA = new Date(2026, 4, 5);
      const dateB = new Date(2026, 4, 5);

      expect(isSameDay(dateA, dateB)).toBe(true);
    });

    it('returns false for different days', () => {
      const dateA = new Date(2026, 4, 5);
      const dateB = new Date(2026, 4, 6);

      expect(isSameDay(dateA, dateB)).toBe(false);
    });
  });

  describe('getMondayBasedMonthOffset', () => {
    it('returns correct offset for a Monday', () => {
      const date = new Date(2026, 4, 4); // May 4, 2026 (Monday)
      expect(getMondayBasedMonthOffset(date)).toBe(0);
    });

    it('returns correct offset for a Sunday', () => {
      const date = new Date(2026, 4, 10); // May 10, 2026 (Sunday)
      expect(getMondayBasedMonthOffset(date)).toBe(6);
    });

    it('returns correct offset for a Wednesday', () => {
      const date = new Date(2026, 4, 6); // May 6, 2026 (Wednesday)
      expect(getMondayBasedMonthOffset(date)).toBe(2);
    });
  });

  describe('useGetCalendarDays', () => {
    it('returns correct calendar days for a given month', () => {
      const visibleDate = new Date(2026, 4, 1); // May 2026
      const calendarDays = useGetCalendarDays(visibleDate);

      expect(calendarDays[0]).toEqual({
        type: 'empty',
        key: 'empty-0',
      });

      expect(calendarDays[34]).toEqual({
        type: 'day',
        key: '2026-05-31',
        date: new Date(2026, 4, 31),
      });
    });
  });
});
