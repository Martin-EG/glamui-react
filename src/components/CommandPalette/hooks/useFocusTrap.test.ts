import { renderHook, fireEvent } from '../../../test-utils';
import { useFocusTrap } from './useFocusTrap';

describe('useFocusTrap', () => {
  let panel: HTMLDivElement;
  let outsideButton: HTMLButtonElement;
  let input: HTMLInputElement;
  let firstItem: HTMLButtonElement;
  let lastItem: HTMLButtonElement;

  beforeEach(() => {
    outsideButton = document.createElement('button');
    outsideButton.textContent = 'outside';
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    panel = document.createElement('div');
    input = document.createElement('input');
    firstItem = document.createElement('button');
    lastItem = document.createElement('button');
    panel.appendChild(input);
    panel.appendChild(firstItem);
    panel.appendChild(lastItem);
    document.body.appendChild(panel);
  });

  afterEach(() => {
    document.body.removeChild(panel);
    document.body.removeChild(outsideButton);
  });

  it('moves focus to the initial focus target on open', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    expect(document.activeElement).toBe(input);
  });

  it('does nothing when closed', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useFocusTrap({
        isOpen: false,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    expect(document.activeElement).toBe(outsideButton);
  });

  it('calls onClose on Escape', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('wraps Tab from the last focusable element back to the first', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    lastItem.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(input);
  });

  it('wraps Shift+Tab from the first focusable element back to the last', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    input.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(lastItem);
  });

  it('locks and restores body scroll', () => {
    const onClose = jest.fn();
    const { unmount } = renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('returns focus to the previously focused element on close', () => {
    const onClose = jest.fn();
    const { unmount } = renderHook(() =>
      useFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        initialFocusRef: { current: input },
        onClose,
      }),
    );

    expect(document.activeElement).toBe(input);
    unmount();
    expect(document.activeElement).toBe(outsideButton);
  });
});
