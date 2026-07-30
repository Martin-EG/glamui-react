'use client';

import { DragEvent, FC, useEffect, useId, useRef, useState } from 'react';
import { Image as ImageIcon, Upload } from '../Icon';

import {
  BrowseButton,
  BrowseRow,
  DragText,
  DropZone,
  ErrorText,
  FieldWrapper,
  HelperText,
  HiddenInput,
  PreviewImage,
  SeparatorText,
  UploadIconWrapper,
} from './FileInput.styles';
import type { FileInputProps, FilePreview } from './FileInput.types';
import Label from '../Label';

const bytesPerMB = 1024 * 1024;

const FileInput: FC<FileInputProps> = ({
  label,
  error,
  helperText,
  maxSizeMB = 10,
  browseLabel,
  dragLabel,
  orLabel = 'or',
  errorSizeText,
  id,
  disabled,
  multiple,
  accept = 'image/png,image/jpeg',
  initialPreviewUrl,
  initialPreviewAlt,
  onChange,
  onFilesChange,
  ...props
}) => {
  const helperTextStr =
    helperText || `PNG, JPG max ${maxSizeMB}MB`;
  const browseLabelStr = browseLabel || 'Select a photo';
  const dragLabelStr = dragLabel || 'Drag an image here';
  const errorSizeStr =
    errorSizeText ||
    `The file is too large. The maximum allowed size is ${maxSizeMB}MB.`;

  const generatedId = useId();
  const inputId = id ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | undefined>(undefined);
  const [isDragging, setIsDragging] = useState(false);
  const [sizeError, setSizeError] = useState<string>();
  const [preview, setPreview] = useState<FilePreview | undefined>(
    initialPreviewUrl
      ? {
          url: initialPreviewUrl,
          name: initialPreviewAlt ?? '',
        }
      : undefined,
  );

  const visibleError = error ?? sizeError;
  const errorId = visibleError ? `${inputId}-error` : undefined;
  const errorText = !!visibleError ? (
    <ErrorText id={errorId} role="alert">
      {visibleError}
    </ErrorText>
  ) : null;

  const labelText = label ? <Label htmlFor={inputId} text={label} /> : null;

  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const clearPreview = () => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = undefined;
    }

    setPreview(undefined);
  };

  const updatePreview = (files: File[]) => {
    const imageFile = files.find((file) => file.type.startsWith('image/'));

    if (!imageFile) {
      clearPreview();
      return;
    }

    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(imageFile);
    previewUrlRef.current = previewUrl;
    setPreview({
      url: previewUrl,
      name: imageFile.name,
    });
  };

  const handleFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList);
    const selectedFiles = multiple ? files : files.slice(0, 1);
    const oversizedFile = selectedFiles.find(
      (file) => file.size > maxSizeMB * bytesPerMB,
    );

    if (oversizedFile) {
      setSizeError(errorSizeStr);
      clearPreview();
      onFilesChange?.([]);
      return;
    }

    setSizeError(undefined);
    updatePreview(selectedFiles);
    onFilesChange?.(selectedFiles);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) {
      return;
    }

    handleFiles(event.dataTransfer.files);
  };

  return (
    <FieldWrapper $hasError={!!visibleError} $disabled={!!disabled}>
      {labelText}

      <DropZone
        $hasError={!!visibleError}
        $disabled={!!disabled}
        $isDragging={isDragging}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <HiddenInput
          id={inputId}
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          aria-invalid={!!visibleError}
          aria-describedby={errorId}
          onChange={(event) => {
            onChange?.(event);
            handleFiles(event.target.files ?? []);
          }}
          {...props}
        />

        {preview ? (
          <PreviewImage src={preview.url} alt={preview.name} />
        ) : (
          <UploadIconWrapper>
            <Upload size="xl" strokeWidth={2.5} />
          </UploadIconWrapper>
        )}

        <DragText>{dragLabelStr}</DragText>
        <SeparatorText>{orLabel}</SeparatorText>
        <BrowseRow>
          <BrowseButton
            type="button"
            disabled={disabled}
            onClick={() => inputRef.current?.click()}
          >
            <ImageIcon size="sm" />
            {browseLabelStr}
          </BrowseButton>
        </BrowseRow>
        <HelperText>{helperTextStr}</HelperText>
      </DropZone>

      {errorText}
    </FieldWrapper>
  );
};

export default FileInput;
