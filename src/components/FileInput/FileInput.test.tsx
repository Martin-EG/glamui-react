import { render, screen, fireEvent } from '../../test-utils';
import 'jest-styled-components';

import FileInput from './FileInput';

describe('FileInput', () => {
  const fileInput = {
    dragLabel: 'Drag an image here',
    browseLabel: 'Select a photo',
  };
  const productPhotoLabel = 'Product photo';
  const createObjectURL = jest.fn((file: File) => `blob:${file.name}`);
  const revokeObjectURL = jest.fn();

  beforeEach(() => {
    createObjectURL.mockClear();
    revokeObjectURL.mockClear();
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: createObjectURL,
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: revokeObjectURL,
    });
  });

  it('renders file input correctly', () => {
    render(<FileInput label={productPhotoLabel} />);

    const input = screen.getByLabelText(productPhotoLabel);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'file');
    expect(screen.getByText(fileInput.dragLabel)).toBeInTheDocument();
    expect(screen.getByText(fileInput.browseLabel)).toBeInTheDocument();
  });

  it('renders without a label', () => {
    render(<FileInput data-testid="file-input" />);

    expect(screen.getByTestId('file-input')).toBeInTheDocument();
  });

  it('renders error message and aria attributes', () => {
    const customError = 'Upload a product photo';

    render(
      <FileInput
        id="product-photo"
        label={productPhotoLabel}
        error={customError}
      />,
    );

    const input = screen.getByLabelText(productPhotoLabel);
    const errorMessage = screen.getByText(customError);

    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAttribute('aria-describedby', 'product-photo-error');
    expect(errorMessage).toHaveAttribute('id', 'product-photo-error');
  });

  it('handles disabled state', () => {
    render(<FileInput disabled label={productPhotoLabel} />);

    expect(screen.getByLabelText(productPhotoLabel)).toBeDisabled();
    expect(
      screen.getByRole('button', {
        name: new RegExp(fileInput.browseLabel, 'i'),
      }),
    ).toBeDisabled();
  });

  it('passes selected files to onFilesChange', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(
      <FileInput label={productPhotoLabel} onFilesChange={handleFilesChange} />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [file] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('passes multiple selected files to onFilesChange', () => {
    const handleFilesChange = jest.fn();
    const firstFile = new File(['image'], 'first-photo.png', {
      type: 'image/png',
    });
    const secondFile = new File(['image'], 'second-photo.png', {
      type: 'image/png',
    });
    render(
      <FileInput
        multiple
        label={productPhotoLabel}
        onFilesChange={handleFilesChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [firstFile, secondFile] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([firstFile, secondFile]);
  });

  it('shows a preview when user selects an image', () => {
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(<FileInput label={productPhotoLabel} />);

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [file] },
    });

    expect(screen.getByAltText('photo.png')).toHaveAttribute(
      'src',
      'blob:photo.png',
    );
    expect(createObjectURL).toHaveBeenCalledWith(file);
  });

  it('clears preview when user selects a non-image file', () => {
    const imageFile = new File(['image'], 'photo.png', { type: 'image/png' });
    const textFile = new File(['notes'], 'notes.txt', { type: 'text/plain' });
    render(<FileInput label={productPhotoLabel} />);

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [imageFile] },
    });
    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [textFile] },
    });

    expect(screen.queryByAltText('photo.png')).not.toBeInTheDocument();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:photo.png');
  });

  it('handles empty file selections', () => {
    const handleFilesChange = jest.fn();
    render(
      <FileInput label={productPhotoLabel} onFilesChange={handleFilesChange} />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: null },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([]);
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it('passes dropped files to onFilesChange', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(
      <FileInput label={productPhotoLabel} onFilesChange={handleFilesChange} />,
    );

    fireEvent.drop(screen.getByText(fileInput.dragLabel), {
      dataTransfer: { files: [file] },
    });

    expect(handleFilesChange).toHaveBeenCalledWith([file]);
  });

  it('shows a preview when user drops an image', () => {
    const file = new File(['image'], 'dropped-photo.png', {
      type: 'image/png',
    });
    render(<FileInput label={productPhotoLabel} />);

    fireEvent.drop(screen.getByText(fileInput.dragLabel), {
      dataTransfer: { files: [file] },
    });

    expect(screen.getByAltText('dropped-photo.png')).toHaveAttribute(
      'src',
      'blob:dropped-photo.png',
    );
  });

  it('does not process dropped files when disabled', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['image'], 'photo.png', { type: 'image/png' });
    render(
      <FileInput
        disabled
        label={productPhotoLabel}
        onFilesChange={handleFilesChange}
      />,
    );

    fireEvent.drop(screen.getByText(fileInput.dragLabel), {
      dataTransfer: { files: [file] },
    });

    expect(handleFilesChange).not.toHaveBeenCalled();
    expect(createObjectURL).not.toHaveBeenCalled();
  });

  it('handles drag enter, drag over, and drag leave states', () => {
    render(<FileInput label={productPhotoLabel} />);

    const dropZoneContent = screen.getByText(fileInput.dragLabel);
    fireEvent.dragEnter(dropZoneContent);
    fireEvent.dragOver(dropZoneContent);
    fireEvent.dragLeave(dropZoneContent);

    expect(dropZoneContent).toBeInTheDocument();
  });

  it('ignores drag activation while disabled', () => {
    render(<FileInput disabled label={productPhotoLabel} />);

    const dropZoneContent = screen.getByText(fileInput.dragLabel);
    fireEvent.dragEnter(dropZoneContent);
    fireEvent.dragOver(dropZoneContent);

    expect(dropZoneContent).toBeInTheDocument();
  });

  it('opens native file picker when browse button is clicked', () => {
    const clickSpy = jest
      .spyOn(HTMLInputElement.prototype, 'click')
      .mockImplementation();

    render(<FileInput label={productPhotoLabel} />);

    fireEvent.click(
      screen.getByRole('button', {
        name: new RegExp(fileInput.browseLabel, 'i'),
      }),
    );

    expect(clickSpy).toHaveBeenCalledTimes(1);
    clickSpy.mockRestore();
  });

  it('replaces previous preview when user selects another image', () => {
    const firstFile = new File(['image'], 'first-photo.png', {
      type: 'image/png',
    });
    const secondFile = new File(['image'], 'second-photo.png', {
      type: 'image/png',
    });
    render(<FileInput label={productPhotoLabel} />);

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [firstFile] },
    });
    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [secondFile] },
    });

    expect(screen.queryByAltText('first-photo.png')).not.toBeInTheDocument();
    expect(screen.getByAltText('second-photo.png')).toHaveAttribute(
      'src',
      'blob:second-photo.png',
    );
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:first-photo.png');
  });

  it('shows size error when selected file exceeds max size', () => {
    const handleFilesChange = jest.fn();
    const file = new File(['oversized'], 'photo.png', { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: 2 * 1024 * 1024 });

    render(
      <FileInput
        label={productPhotoLabel}
        maxSizeMB={1}
        onFilesChange={handleFilesChange}
      />,
    );

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [file] },
    });

    expect(
      screen.getByText(
        'The file is too large. The maximum allowed size is 1MB.',
      ),
    ).toBeInTheDocument();
    expect(handleFilesChange).toHaveBeenCalledWith([]);
  });

  it('clears preview when selected file exceeds max size', () => {
    const validFile = new File(['image'], 'photo.png', { type: 'image/png' });
    const oversizedFile = new File(['oversized'], 'large-photo.png', {
      type: 'image/png',
    });
    Object.defineProperty(oversizedFile, 'size', { value: 2 * 1024 * 1024 });

    render(<FileInput label={productPhotoLabel} maxSizeMB={1} />);

    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [validFile] },
    });
    fireEvent.change(screen.getByLabelText(productPhotoLabel), {
      target: { files: [oversizedFile] },
    });

    expect(screen.queryByAltText('photo.png')).not.toBeInTheDocument();
    expect(revokeObjectURL).toHaveBeenCalledWith('blob:photo.png');
  });
});
