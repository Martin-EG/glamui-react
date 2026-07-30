export interface SegmentedControlOption {
  label: string;
  value: string;
}

export interface SegmentedControlProps {
  readonly options: SegmentedControlOption[];
  readonly value: string;
  readonly onChange: (value: string) => void;
  readonly 'aria-label': string;
}
