jest.mock('./hooks/dates', () => {
  const originalModule = jest.requireActual('./hooks/dates');
  return {
    ...originalModule,
    useGetCalendarDays: jest.fn(),
  };
});

import { render, screen, fireEvent } from '../../../test-utils';

import { useGetCalendarDays } from './hooks/dates';
import DaysGrid from './DaysGrid';

describe('DaysGrid', () => {
  const mockCalendarDays = [
    { type: 'empty', key: 'empty-0' },
    { type: 'day', key: '2026-05-01', date: new Date(2026, 4, 1) },
    { type: 'day', key: '2026-05-27', date: new Date(2026, 4, 27) },
    { type: 'day', key: '2026-05-31', date: new Date(2026, 4, 31) },
  ];
  const handleDateSelect = jest.fn();

  beforeEach(() => {
    (useGetCalendarDays as jest.Mock).mockReturnValue(mockCalendarDays);
  });

  it('renders calendar days correctly', () => {
    render(
      <DaysGrid
        visibleDate={new Date(2026, 4, 1)}
        onDateSelect={handleDateSelect}
      />,
    );

    expect(screen.getByTestId('empty-day')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockCalendarDays[1].key }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockCalendarDays[2].key }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: mockCalendarDays[3].key }),
    ).toBeInTheDocument();
  });

  it('calls onDateSelect when a day is clicked', () => {
    render(
      <DaysGrid
        visibleDate={new Date(2026, 4, 1)}
        onDateSelect={handleDateSelect}
      />,
    );

    fireEvent.click(
      screen.getByRole('button', { name: mockCalendarDays[1].key }),
    );

    expect(handleDateSelect).toHaveBeenCalledWith(mockCalendarDays[1].date);
    expect(handleDateSelect).toHaveBeenCalledTimes(1);
  });
});
