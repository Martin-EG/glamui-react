import { useCallback } from 'react';

interface UseHandleFocusWithKeyboardCallbackProps {
  itemRefs: React.RefObject<HTMLButtonElement[]>;
}

type UseHandleFocusWithKeyboardCallback = (
  props: UseHandleFocusWithKeyboardCallbackProps,
) => (e: React.KeyboardEvent) => void;
export const useHandleFocusWithKeyboardCallback: UseHandleFocusWithKeyboardCallback =
  ({ itemRefs }) => {
    return useCallback(
      (e: React.KeyboardEvent) => {
        const currentIndex = itemRefs.current.findIndex(
          (element) => element === document.activeElement,
        );

        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            itemRefs.current[
              (currentIndex + 1) % itemRefs.current.length
            ]?.focus();
            break;

          case 'ArrowUp':
            e.preventDefault();
            itemRefs.current[
              (currentIndex - 1 + itemRefs.current.length) %
                itemRefs.current.length
            ]?.focus();
            break;

          case 'Home':
            e.preventDefault();
            itemRefs.current[0]?.focus();
            break;

          case 'End':
            e.preventDefault();
            itemRefs.current[itemRefs.current.length - 1]?.focus();
            break;
        }
      },
      [itemRefs],
    );
  };
