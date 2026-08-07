import { renderHook, fireEvent } from '../../../test-utils';
import { useSnackbarFocusTrap } from './useSnackbarFocusTrap';

describe('useSnackbarFocusTrap', () => {
  let panel: HTMLDivElement;
  let outsideButton: HTMLButtonElement;
  let actionButton: HTMLButtonElement;
  let dismissButton: HTMLButtonElement;

  beforeEach(() => {
    outsideButton = document.createElement('button');
    outsideButton.textContent = 'outside';
    document.body.appendChild(outsideButton);
    outsideButton.focus();

    panel = document.createElement('div');
    panel.tabIndex = -1;
    actionButton = document.createElement('button');
    dismissButton = document.createElement('button');
    panel.appendChild(actionButton);
    panel.appendChild(dismissButton);
    document.body.appendChild(panel);
  });

  afterEach(() => {
    document.body.removeChild(panel);
    document.body.removeChild(outsideButton);
  });

  it('moves focus to the first focusable control on open', () => {
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    expect(document.activeElement).toBe(actionButton);
  });

  it('falls back to the panel itself when there are no focusable controls', () => {
    panel.removeChild(actionButton);
    panel.removeChild(dismissButton);

    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    expect(document.activeElement).toBe(panel);
  });

  it('does nothing when closed', () => {
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: false,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    expect(document.activeElement).toBe(outsideButton);
  });

  it('calls onClose on Escape', () => {
    const onClose = jest.fn();
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose,
      }),
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('wraps Tab from the last focusable element back to the first', () => {
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    dismissButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(actionButton);
  });

  it('wraps Shift+Tab from the first focusable element back to the last', () => {
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    actionButton.focus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(dismissButton);
  });

  it('does not lock body scroll', () => {
    renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    expect(document.body.style.overflow).toBe('');
  });

  it('returns focus to the previously focused element on close', () => {
    const { unmount } = renderHook(() =>
      useSnackbarFocusTrap({
        isOpen: true,
        panelRef: { current: panel },
        onClose: jest.fn(),
      }),
    );

    expect(document.activeElement).toBe(actionButton);
    unmount();
    expect(document.activeElement).toBe(outsideButton);
  });
});
