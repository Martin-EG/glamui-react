'use client';

import {
  ChangeEvent,
  FC,
  FocusEvent,
  MouseEvent,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

import { Calendar } from '../Icon';
import Label from '../Label';
import { ErrorText } from '../TextInput/TextInput.styles';

import CalendarPopover, {
  DATE_INPUT_MAX_LENGTH,
  formatDate,
  parseDate,
  sanitizeDateInputValue,
} from './CalendarPopover';
import {
  CalendarButton,
  DateShell,
  FieldWrapper,
  Input,
} from './DateInput.styles';
import type { DateInputProps } from './DateInput.types';

const CALENDAR_POPOVER_WIDTH = 252;
const CALENDAR_POPOVER_ESTIMATED_HEIGHT = 300;
const CALENDAR_POPOVER_GAP = 8;

const DateInput: FC<DateInputProps> = ({
  label,
  error,
  id,
  disabled,
  value,
  defaultValue,
  onChange,
  min,
  max,
  onClick,
  onFocus,
  openCalendarLabel = 'Open calendar',
  ...props
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = error ? `${inputId}-error` : undefined;
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const shouldFocusCalendarRef = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarButtonRef = useRef<HTMLButtonElement>(null);
  const isControlled = value !== undefined;
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ left: 0, top: 0 });
  const [inputValue, setInputValue] = useState(
    String(value ?? defaultValue ?? ''),
  );
  const currentValue = isControlled ? String(value) : inputValue;
  const selectedDate = useMemo(() => parseDate(currentValue), [currentValue]);
  const [visibleDate, setVisibleDate] = useState(selectedDate ?? new Date());

  useEffect(() => {
    if (!isCalendarOpen) return undefined;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        wrapperRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }

      if (!wrapperRef.current?.contains(target)) {
        setIsCalendarOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsCalendarOpen(false);
        calendarButtonRef.current?.focus({ preventScroll: true });
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCalendarOpen]);

  useLayoutEffect(() => {
    if (!isCalendarOpen) return undefined;

    const updatePopoverPosition = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const rect = wrapper.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const maxLeft =
        viewportWidth - CALENDAR_POPOVER_WIDTH - CALENDAR_POPOVER_GAP;
      const left = Math.max(CALENDAR_POPOVER_GAP, Math.min(rect.left, maxLeft));
      const bottomTop = rect.bottom + CALENDAR_POPOVER_GAP;
      const top =
        bottomTop + CALENDAR_POPOVER_ESTIMATED_HEIGHT > viewportHeight
          ? Math.max(
              CALENDAR_POPOVER_GAP,
              rect.top -
                CALENDAR_POPOVER_ESTIMATED_HEIGHT -
                CALENDAR_POPOVER_GAP,
            )
          : bottomTop;

      setPopoverPosition({ left, top });
    };

    updatePopoverPosition();

    const focusFrame = shouldFocusCalendarRef.current
      ? window.requestAnimationFrame(() => {
          popoverRef.current?.focus({ preventScroll: true });
          shouldFocusCalendarRef.current = false;
        })
      : undefined;

    window.addEventListener('resize', updatePopoverPosition);
    window.addEventListener('scroll', updatePopoverPosition, true);

    return () => {
      if (focusFrame !== undefined) {
        window.cancelAnimationFrame(focusFrame);
      }

      window.removeEventListener('resize', updatePopoverPosition);
      window.removeEventListener('scroll', updatePopoverPosition, true);
    };
  }, [isCalendarOpen]);

  const updateDateValue = (nextValue: string) => {
    if (!isControlled) {
      setInputValue(nextValue);
    }

    const input = inputRef.current as HTMLInputElement;
    input.value = nextValue;
    onChange?.({
      target: input,
      currentTarget: input,
    } as ChangeEvent<HTMLInputElement>);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextValue = sanitizeDateInputValue(event.target.value);
    event.target.value = nextValue;
    if (inputRef.current) {
      inputRef.current.value = nextValue;
    }

    if (!isControlled) {
      setInputValue(nextValue);
    }

    const nextDate = parseDate(nextValue);

    if (nextDate) {
      setVisibleDate(nextDate);
    }

    onChange?.(event);
  };

  const onDateSelect = (date: Date) => {
    updateDateValue(formatDate(date));
    setIsCalendarOpen(false);
    calendarButtonRef.current?.focus({ preventScroll: true });
  };

  const openCalendar = (shouldFocusCalendar = false) => {
    shouldFocusCalendarRef.current = shouldFocusCalendar;

    if (!isCalendarOpen && selectedDate) {
      setVisibleDate(selectedDate);
    }

    setIsCalendarOpen(true);
  };

  const toggleCalendar = () => {
    if (!isCalendarOpen) {
      openCalendar(true);
      return;
    }

    setIsCalendarOpen((isOpen) => !isOpen);
  };

  const handleInputClick = (event: MouseEvent<HTMLInputElement>) => {
    onClick?.(event);
    openCalendar();
  };

  const handleInputFocus = (event: FocusEvent<HTMLInputElement>) => {
    onFocus?.(event);
    openCalendar();
  };

  const labelText = !!label ? <Label text={label} htmlFor={inputId} /> : null;
  const errorText = !!error ? (
    <ErrorText id={errorId} role="alert">
      {error}
    </ErrorText>
  ) : null;

  const calendarPopover =
    isCalendarOpen && typeof document !== 'undefined'
      ? createPortal(
          <CalendarPopover
            inputId={inputId}
            ref={popoverRef}
            minDate={min}
            maxDate={max}
            position={popoverPosition}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            visibleDate={visibleDate}
            setVisibleDate={setVisibleDate}
          />,
          document.body,
        )
      : null;

  return (
    <FieldWrapper $hasError={!!error} $disabled={!!disabled}>
      {labelText}

      <DateShell ref={wrapperRef} $hasError={!!error} $disabled={!!disabled}>
        <Input
          id={inputId}
          ref={inputRef}
          type="text"
          inputMode="numeric"
          $hasError={!!error}
          $disabled={!!disabled}
          aria-invalid={!!error}
          aria-describedby={errorId}
          disabled={disabled}
          value={currentValue}
          min={min}
          max={max}
          maxLength={DATE_INPUT_MAX_LENGTH}
          onChange={handleInputChange}
          onClick={handleInputClick}
          onFocus={handleInputFocus}
          placeholder="YYYY-MM-DD"
          {...props}
        />
        <CalendarButton
          ref={calendarButtonRef}
          type="button"
          aria-label={openCalendarLabel}
          aria-expanded={isCalendarOpen}
          aria-controls={`${inputId}-calendar`}
          disabled={disabled}
          onClick={toggleCalendar}
        >
          <Calendar size="sm" />
        </CalendarButton>
      </DateShell>

      {calendarPopover}

      {errorText}
    </FieldWrapper>
  );
};

export default DateInput;
