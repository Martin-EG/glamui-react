/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '../../../test-utils';
import { useHandleFocusWithKeyboardCallback } from './useHandleFocusWithKeyboardCallback';

describe('useHandleFocusWithKeyboardCallback', () => {
  const createButton = () => {
    const btn = document.createElement('button');
    document.body.appendChild(btn);
    return btn;
  };

  let buttons: HTMLButtonElement[];
  let itemRefs: { current: HTMLButtonElement[] };

  beforeEach(() => {
    buttons = [createButton(), createButton(), createButton()];
    itemRefs = { current: buttons };
  });

  afterEach(() => {
    buttons.forEach((btn) => document.body.removeChild(btn));
  });

  it('focuses the next item on ArrowDown', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[0].focus();
    const event = { key: 'ArrowDown', preventDefault: jest.fn() } as any;

    handleKeyDown(event);

    expect(document.activeElement).toBe(buttons[1]);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('wraps around to the first item on ArrowDown at the end', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[2].focus();
    handleKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() } as any);

    expect(document.activeElement).toBe(buttons[0]);
  });

  it('focuses the previous item on ArrowUp', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[1].focus();
    const event = { key: 'ArrowUp', preventDefault: jest.fn() } as any;

    handleKeyDown(event);

    expect(document.activeElement).toBe(buttons[0]);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('wraps around to the last item on ArrowUp at the start', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[0].focus();
    handleKeyDown({ key: 'ArrowUp', preventDefault: jest.fn() } as any);

    expect(document.activeElement).toBe(buttons[2]);
  });

  it('focuses the first item on Home', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[2].focus();
    const event = { key: 'Home', preventDefault: jest.fn() } as any;

    handleKeyDown(event);

    expect(document.activeElement).toBe(buttons[0]);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('focuses the last item on End', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[0].focus();
    const event = { key: 'End', preventDefault: jest.fn() } as any;

    handleKeyDown(event);

    expect(document.activeElement).toBe(buttons[2]);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('does nothing for other keys', () => {
    const { result } = renderHook(() =>
      useHandleFocusWithKeyboardCallback({ itemRefs }),
    );
    const handleKeyDown = result.current;

    buttons[0].focus();
    const event = { key: 'Enter', preventDefault: jest.fn() } as any;

    handleKeyDown(event);

    expect(document.activeElement).toBe(buttons[0]);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });
});
