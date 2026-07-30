/**
 * @property {placeholder} placeholder - The placeholder of the Searchbar
 * @property {value} value - The value of the Searchbar
 * @property {onChange} onChange - The onChange of the Searchbar
 * @property {onClear} onClear - The onClear of the Searchbar

 */

import { ChangeEvent } from 'react';

export interface SearchbarProps {
  readonly placeholder?: string;
  readonly clearLabel?: string;
  readonly value: string;
  readonly onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  readonly onClear?: () => void;
}
