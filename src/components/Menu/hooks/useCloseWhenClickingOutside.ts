import { useEffect } from 'react';

interface UseCloseWhenClickingOutsideProps {
  isOpen: boolean;
  closeMenu: () => void;
  ref: React.RefObject<HTMLDivElement | null>;
}

type UseCloseWhenClickingOutside = (
  props: UseCloseWhenClickingOutsideProps,
) => void;
export const useCloseWhenClickingOutside: UseCloseWhenClickingOutside = ({
  isOpen,
  closeMenu,
  ref,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const closeByClickingOutside = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const closeWithEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };

    document.addEventListener('mousedown', closeByClickingOutside);
    document.addEventListener('keydown', closeWithEscapeKey);

    return () => {
      document.removeEventListener('mousedown', closeByClickingOutside);
      document.removeEventListener('keydown', closeWithEscapeKey);
    };
  }, [closeMenu, isOpen, ref]);
};
