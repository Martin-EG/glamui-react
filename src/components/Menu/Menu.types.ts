/**
 * Menu Item types
 * @property {id} id - Id for menu item
 * @property {label} label - The label for the menu item
 * @property {icon} icon - Optional icon for the menu item
 * @property {onClick} onClick - function call when menu item is clicked
 * @property {disabled} disabled - Optional prop to disable menu item, false by default
 * @property {variant} variant - The variant of the button
 *
 *  Menu types
 * @property {items} items - Items that menu will contain
 * @property {align} align 0 Alignment for the menu component
 */

import type { Icon } from '../Icon';

export interface MenuItem {
  label: string;
  MenuItemIcon?: Icon;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'default' | 'danger';
}

export interface MenuProps {
  readonly items: MenuItem[];
  readonly align?: 'left' | 'right';
  readonly triggerAriaLabel?: string;
}
