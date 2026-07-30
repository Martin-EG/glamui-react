import type { ReactNode } from 'react';

export interface CommandPaletteItem {
  readonly id: string;
  readonly label: string;
  readonly icon?: ReactNode;
  readonly onSelect: () => void;
}

export interface CommandPaletteProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly items: CommandPaletteItem[];
  readonly placeholder?: string;
}
