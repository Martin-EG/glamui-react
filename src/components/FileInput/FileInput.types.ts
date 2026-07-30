export interface FileInputProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'onChange'
> {
  label?: string;
  error?: string;
  helperText?: string;
  maxSizeMB?: number;
  browseLabel?: string;
  dragLabel?: string;
  orLabel?: string;
  errorSizeText?: string;
  initialPreviewUrl?: string | null;
  initialPreviewAlt?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFilesChange?: (files: File[]) => void;
}

export type FilePreview = {
  url: string;
  name: string;
};
