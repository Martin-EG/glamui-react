import { renderHook, waitFor } from '@testing-library/react';

import { useCroppedImage } from './useCroppedImage';

describe('useCroppedImage', () => {
  let mockCanvas: Partial<HTMLCanvasElement>;
  let mockContext: Partial<CanvasRenderingContext2D>;
  let originalCreateElement: typeof document.createElement;
  let originalImage: typeof Image;

  beforeEach(() => {
    originalCreateElement = document.createElement;
    originalImage = global.Image;

    mockContext = {
      drawImage: jest.fn(),
    };

    mockCanvas = {
      width: 0,
      height: 0,
      getContext: jest.fn((contextId: string) => {
        if (contextId === '2d') {
          return mockContext as CanvasRenderingContext2D;
        }
        return null;
      }) as HTMLCanvasElement['getContext'],
      toBlob: jest.fn((callback) => {
        const blob = new Blob(['fake-image-data'], { type: 'image/jpeg' });
        if (callback) callback(blob);
      }),
    };

    document.createElement = jest.fn((tagName: string) => {
      if (tagName === 'canvas') {
        return mockCanvas as HTMLCanvasElement;
      }
      return originalCreateElement.call(document, tagName);
    }) as typeof document.createElement;

    global.Image = class MockImage {
      onload: (() => void) | null = null;
      src = '';

      constructor() {
        setTimeout(() => {
          if (this.onload) {
            this.onload();
          }
        }, 0);
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    document.createElement = originalCreateElement;
    global.Image = originalImage;
    jest.clearAllMocks();
  });

  it('returns a function that crops an image', () => {
    const { result } = renderHook(() => useCroppedImage());

    expect(typeof result.current).toBe('function');
  });

  it('creates a canvas with correct dimensions from crop data', async () => {
    const { result } = renderHook(() => useCroppedImage());
    const cropImage = result.current;

    const crop = {
      x: 10,
      y: 20,
      width: 100,
      height: 150,
    };

    await cropImage('data:image/png;base64,fake', crop);

    expect(mockCanvas.width).toBe(100);
    expect(mockCanvas.height).toBe(150);
  });

  it('calls drawImage with correct crop parameters', async () => {
    const { result } = renderHook(() => useCroppedImage());
    const cropImage = result.current;

    const crop = {
      x: 10,
      y: 20,
      width: 100,
      height: 150,
    };

    await cropImage('data:image/png;base64,fake', crop);

    await waitFor(() => {
      expect(mockContext.drawImage).toHaveBeenCalledWith(
        expect.any(Object),
        10,
        20,
        100,
        150,
        0,
        0,
        100,
        150,
      );
    });
  });

  it('returns a blob with image/jpeg type', async () => {
    const { result } = renderHook(() => useCroppedImage());
    const cropImage = result.current;

    const crop = {
      x: 0,
      y: 0,
      width: 50,
      height: 50,
    };

    const blob = await cropImage('data:image/png;base64,fake', crop);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/jpeg');
  });

  it('handles different crop dimensions', async () => {
    const { result } = renderHook(() => useCroppedImage());
    const cropImage = result.current;

    const crop = {
      x: 5,
      y: 15,
      width: 200,
      height: 300,
    };

    await cropImage('data:image/png;base64,fake', crop);

    expect(mockCanvas.width).toBe(200);
    expect(mockCanvas.height).toBe(300);
    expect(mockContext.drawImage).toHaveBeenCalledWith(
      expect.any(Object),
      5,
      15,
      200,
      300,
      0,
      0,
      200,
      300,
    );
  });

  it('waits for image to load before processing', async () => {
    const { result } = renderHook(() => useCroppedImage());
    const cropImage = result.current;

    const crop = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    };

    const promise = cropImage('data:image/png;base64,fake', crop);

    await waitFor(() => {
      expect(mockContext.drawImage).toHaveBeenCalled();
    });

    const blob = await promise;
    expect(blob).toBeInstanceOf(Blob);
  });

  it('returns the same function reference on re-renders', () => {
    const { result, rerender } = renderHook(() => useCroppedImage());
    const firstFunction = result.current;

    rerender();
    const secondFunction = result.current;

    expect(firstFunction).toBe(secondFunction);
  });
});
