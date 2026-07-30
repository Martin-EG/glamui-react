import { renderHook, fireEvent } from '../../../test-utils';
import { useCloseWhenClickingOutside } from './useCloseWhenClickingOutside';

describe('useCloseWhenClickingOutside', () => {
  const closeMenu = jest.fn();
  const ref = { current: document.createElement('div') };

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.appendChild(ref.current);
  });

  afterEach(() => {
    document.body.removeChild(ref.current);
  });

  it('adds event listeners when isOpen is true', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    addEventListenerSpy.mockRestore();
  });

  it('removes event listeners on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(document, 'removeEventListener');
    const { unmount } = renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'mousedown',
      expect.any(Function),
    );
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'keydown',
      expect.any(Function),
    );
    removeEventListenerSpy.mockRestore();
  });

  it('calls closeMenu when clicking outside', () => {
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    fireEvent.mouseDown(document.body);
    expect(closeMenu).toHaveBeenCalledTimes(1);
  });

  it('does not call closeMenu when clicking inside', () => {
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    fireEvent.mouseDown(ref.current);
    expect(closeMenu).not.toHaveBeenCalled();
  });

  it('calls closeMenu when Escape key is pressed', () => {
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(closeMenu).toHaveBeenCalledTimes(1);
  });

  it('does not call closeMenu when other keys are pressed', () => {
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: true, closeMenu, ref }),
    );

    fireEvent.keyDown(document, { key: 'Enter' });
    expect(closeMenu).not.toHaveBeenCalled();
  });

  it('does not add listeners when isOpen is false', () => {
    const addEventListenerSpy = jest.spyOn(document, 'addEventListener');
    renderHook(() =>
      useCloseWhenClickingOutside({ isOpen: false, closeMenu, ref }),
    );

    expect(addEventListenerSpy).not.toHaveBeenCalled();
    addEventListenerSpy.mockRestore();
  });
});
