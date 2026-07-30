/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import 'jest-styled-components';
import ImageCropModal from './ImageCropModal';
import { useCroppedImage } from './hooks';
import React from 'react';

jest.mock('react-easy-crop', () => {
  return {
    __esModule: true,
    default: ({ onCropComplete }: any) => (
      <div
        data-testid="mock-cropper"
        onClick={() =>
          onCropComplete?.({}, { x: 0, y: 0, width: 100, height: 100 })
        }
      >
        Mock Cropper
      </div>
    ),
  };
});

jest.mock('./hooks', () => ({
  useCroppedImage: jest.fn(),
}));

describe('ImageCropModal', () => {
  const mockOnCancel = jest.fn();
  const mockOnConfirm = jest.fn();
  const mockGetCroppedImage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useCroppedImage as jest.Mock).mockReturnValue(mockGetCroppedImage);
    mockGetCroppedImage.mockResolvedValue(
      new Blob(['test'], { type: 'image/jpeg' }),
    );
  });

  const defaultProps = {
    image: 'test-image.jpg',
    onCancel: mockOnCancel,
    onConfirm: mockOnConfirm,
  };

  it('renders correctly', () => {
    render(<ImageCropModal {...defaultProps} />);
    expect(screen.getByTestId('mock-cropper')).toBeInTheDocument();

    expect(
      screen.getByText('Cancel edition'),
    ).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('calls onConfirm when confirm button is clicked', async () => {
    render(<ImageCropModal {...defaultProps} />);

    const confirmBtn = screen.getByRole('button', {
      name: 'Save',
    });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockGetCroppedImage).toHaveBeenCalled();
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });

  it('calls onCancel when cancel button is clicked', () => {
    render(<ImageCropModal {...defaultProps} />);

    const cancelBtn = screen.getByRole('button', {
      name: 'Cancel edition',
    });
    fireEvent.click(cancelBtn);
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it('sets cropped area pixels when crop is completed', async () => {
    render(<ImageCropModal {...defaultProps} />);

    const cropper = screen.getByTestId('mock-cropper');
    fireEvent.click(cropper);

    const confirmBtn = screen.getByRole('button', {
      name: 'Save',
    });
    fireEvent.click(confirmBtn);

    await waitFor(() => {
      expect(mockGetCroppedImage).toHaveBeenCalledWith('test-image.jpg', {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      });
      expect(mockOnConfirm).toHaveBeenCalled();
    });
  });
});
