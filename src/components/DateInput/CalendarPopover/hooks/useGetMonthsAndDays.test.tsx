import { useGetMonthsAndDays } from './useGetMonthsAndDays';

describe('useGetMonthsAndDays', () => {
  it('returns correct month names and weekdays', () => {
    const { monthNames, weekdays } = useGetMonthsAndDays();

    expect(monthNames).toEqual([
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
    ]);

    expect(weekdays).toEqual(['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']);
  });

  it('supports overriding month names and weekdays', () => {
    const { monthNames, weekdays } = useGetMonthsAndDays({
      monthNames: ['Enero', 'Febrero'],
      weekdays: ['Lunes'],
    });

    expect(monthNames).toEqual(['Enero', 'Febrero']);
    expect(weekdays).toEqual(['Lu']);
  });
});
