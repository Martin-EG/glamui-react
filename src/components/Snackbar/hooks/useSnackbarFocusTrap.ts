import { RefObject, useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface UseSnackbarFocusTrapProps {
  readonly isOpen: boolean;
  readonly panelRef: RefObject<HTMLElement | null>;
  readonly onClose?: () => void;
}

/**
 * Moves focus into the snackbar on open (its action/dismiss button, or the
 * panel itself when neither exists), cycles Tab/Shift+Tab between its
 * focusable controls, closes on Escape, and returns focus to the
 * previously focused element on close. Unlike CommandPalette's trap, it
 * never locks body scroll — a snackbar floats over the page rather than
 * blocking it. Kept local to Snackbar rather than shared.
 */
export function useSnackbarFocusTrap({
  isOpen,
  panelRef,
  onClose,
}: UseSnackbarFocusTrapProps): void {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = (): HTMLElement[] =>
      Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(
          FOCUSABLE_SELECTOR,
        ) ?? [],
      );

    const initialTarget = getFocusable()[0] ?? panelRef.current;
    initialTarget?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose?.();
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [isOpen, panelRef, onClose]);
}
