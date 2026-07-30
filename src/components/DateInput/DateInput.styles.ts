import { styled } from 'styled-components';

interface FieldStateProps {
  $hasError: boolean;
  $disabled: boolean;
}

interface CalendarPopoverPositionProps {
  $left?: number;
  $top?: number;
}

export const FieldWrapper = styled.div<FieldStateProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  opacity: ${({ theme, $disabled }) => ($disabled ? theme.opacity.disabled : 1)};
  margin-top: ${({ theme }) => theme.spacing.sm};
`;

export const DateShell = styled.div<FieldStateProps>`
  position: relative;
  width: 100%;
`;

export const Input = styled.input<FieldStateProps>`
  box-sizing: border-box;
  width: 100%;
  height: ${({ theme }) => theme.size.field};
  padding: ${({ theme }) => theme.spacing.xs}
    calc(
      ${({ theme }) => theme.spacing.xl} + ${({ theme }) => theme.spacing.xs}
    )
    ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: ${({ theme }) => theme.typography.sizes.md};
  line-height: 1;

  background: ${({ theme }) => theme.colors.surface.elevated};
  color: ${({ theme }) => theme.colors.text.primary};

  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError
        ? theme.colors.feedback.errorText
        : theme.colors.border.default};
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.text.secondary};
    box-shadow: 0 0 0 ${({ theme }) => theme.focus.ring.width}
      ${({ theme }) => theme.colors.brand.primaryAlpha};
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const CalendarButton = styled.button`
  position: absolute;
  right: ${({ theme }) => theme.spacing.sm};
  top: 50%;
  display: inline-flex;
  padding: 0;
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transform: translateY(-50%);

  &:disabled {
    cursor: not-allowed;
  }
`;

export const StyledCalendarPopover = styled.div<CalendarPopoverPositionProps>`
  position: ${({ $left, $top }) =>
    typeof $left === 'number' && typeof $top === 'number'
      ? 'fixed'
      : 'absolute'};
  z-index: ${({ theme }) => theme.zIndex.popover};
  top: ${({ $top, theme }) =>
    typeof $top === 'number'
      ? `${$top}px`
      : `calc(100% + ${theme.spacing.xs})`};
  left: ${({ $left }) => (typeof $left === 'number' ? `${$left}px` : '0')};
  width: 252px;
  padding: ${({ theme }) => theme.spacing.sm};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.elevated};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

export const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: ${({ theme }) => theme.size.iconSlot} 1fr
    ${({ theme }) => theme.size.iconSlot};
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const MonthLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

export const NavButton = styled.button`
  display: inline-flex;
  width: ${({ theme }) => theme.size.iconSlot};
  height: ${({ theme }) => theme.size.iconSlot};
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.default};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.md};

  &:hover {
    background: ${({ theme }) => theme.colors.surface.hover};
  }
`;

export const WeekdayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const Weekday = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.xs};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  text-align: center;
`;

export const StyledDaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
`;

interface StyledDayButtonProps {
  $isSelected: boolean;
  $isToday: boolean;
}

export const StyledDayButton = styled.button<StyledDayButtonProps>`
  display: inline-flex;
  width: ${({ theme }) => theme.size.calendarDay};
  height: ${({ theme }) => theme.size.calendarDay};
  align-items: center;
  justify-content: center;
  border: 1px solid
    ${({ theme, $isSelected, $isToday }) =>
      $isSelected || $isToday
        ? theme.colors.brand.primary
        : theme.colors.border.subtle};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.brand.primary : theme.colors.surface.default};
  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.text.onBrand : theme.colors.text.primary};
  cursor: pointer;
  font-size: ${({ theme }) => theme.typography.sizes.sm};

  &:hover:not(:disabled) {
    background: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.brand.secondary : theme.colors.surface.hover};
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.text.muted};
    cursor: not-allowed;
    opacity: ${({ theme }) => theme.opacity.disabledDay};
  }
`;

export const EmptyDay = styled.span`
  width: ${({ theme }) => theme.size.calendarDay};
  height: ${({ theme }) => theme.size.calendarDay};
`;
