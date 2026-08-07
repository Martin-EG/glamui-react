/**
 * Snackbar types
 * @property {SnackbarVariant} variant - The variant of the Snackbar
 */

export type SnackbarVariant =
  | 'default'
  | 'success'
  | 'warning'
  | 'error'
  | 'info';

export interface SnackbarAction {
  readonly label: string;
  readonly onClick: () => void;
}

export interface SnackbarProps {
  readonly message: string;
  /** Controls mount/visibility. The Snackbar renders nothing when `false`. */
  readonly open: boolean;
  readonly variant?: SnackbarVariant;
  /** An optional action, e.g. `{ label: 'Undo', onClick: () => {...} }`. */
  readonly action?: SnackbarAction;
  readonly dismissible?: boolean;
  readonly dismissAriaLabel?: string;
  readonly onClose?: () => void;
  /** Milliseconds before `onClose` is called automatically. Omit to require manual dismissal. */
  readonly autoHideDuration?: number;
}
