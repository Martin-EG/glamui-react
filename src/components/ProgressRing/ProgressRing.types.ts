export type ProgressRingSize = 'sm' | 'md' | 'lg';

export interface ProgressRingProps {
  /** 0–100. Values outside that range are clamped. */
  readonly value: number;
  readonly size?: ProgressRingSize;
  /** Overrides the default `{value}%` center label. */
  readonly label?: string;
}
