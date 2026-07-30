import {
  FC,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import {
  Overlay,
  Panel,
  SearchRow,
  SearchInput,
  List,
  ListItemButton,
  EmptyState,
} from './CommandPalette.styles';
import { useFocusTrap } from './hooks';
import { Search } from '../Icon';
import type { CommandPaletteProps } from './CommandPalette.types';

const CommandPalette: FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  items,
  placeholder = 'Search actions…',
}) => {
  const [query, setQuery] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase()),
      ),
    [items, query],
  );

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  useFocusTrap({ isOpen, panelRef, initialFocusRef: inputRef, onClose });

  if (!isOpen) {
    return null;
  }

  const selectItem = (item: (typeof filtered)[number]) => {
    item.onSelect();
    onClose();
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && filtered.length > 0) {
      event.preventDefault();
      itemRefs.current[0]?.focus();
    }
  };

  const handleItemKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      itemRefs.current[index + 1]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (index === 0) {
        inputRef.current?.focus();
      } else {
        itemRefs.current[index - 1]?.focus();
      }
    } else if (event.key === 'Enter') {
      event.preventDefault();
      selectItem(filtered[index]);
    }
  };

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const resultsList =
    filtered.length === 0 ? (
      <EmptyState>No matching actions</EmptyState>
    ) : (
      <List role="menu" aria-label="Actions">
        {filtered.map((item, index) => (
          <li key={item.id} role="presentation">
            <ListItemButton
              ref={(el) => {
                itemRefs.current[index] = el;
              }}
              role="menuitem"
              onClick={() => selectItem(item)}
              onKeyDown={(event) => handleItemKeyDown(event, index)}
            >
              {item.icon}
              {item.label}
            </ListItemButton>
          </li>
        ))}
      </List>
    );

  return (
    <Overlay onMouseDown={handleOverlayMouseDown}>
      <Panel
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
      >
        <SearchRow>
          <Search size="sm" />
          <SearchInput
            ref={inputRef}
            role="searchbox"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={placeholder}
            aria-label={placeholder}
          />
        </SearchRow>

        {resultsList}
      </Panel>
    </Overlay>
  );
};

export default CommandPalette;
