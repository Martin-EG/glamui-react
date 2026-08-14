import { useState } from 'react';
import { Button, CommandPalette, Search, User } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function CommandPalettePage() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPage
      name="CommandPalette"
      description="A searchable, keyboard-navigable overlay for jumping to actions or pages — the Cmd+K pattern."
      importCode={`import { CommandPalette } from '@glamui/react';`}
      propRows={[
        { name: 'isOpen', type: 'boolean', description: 'Whether the palette is open. Required.' },
        { name: 'onClose', type: '() => void', description: 'Called when the palette should close. Required.' },
        { name: 'items', type: 'CommandPaletteItem[]', description: 'Selectable items. Required.' },
        { name: 'placeholder', type: 'string', description: 'Search input placeholder.' },
      ]}
    >
      <Example
        title="Basic (toggle)"
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open command palette</Button>

<CommandPalette
  isOpen={open}
  onClose={() => setOpen(false)}
  placeholder="Search actions..."
  items={[
    { id: 'profile', label: 'Go to profile', icon: <User />, onSelect: () => setOpen(false) },
    { id: 'search', label: 'Search products', icon: <Search />, onSelect: () => setOpen(false) },
  ]}
/>`}
      >
        <Button onClick={() => setOpen(true)}>Open command palette</Button>
        <CommandPalette
          isOpen={open}
          onClose={() => setOpen(false)}
          placeholder="Search actions..."
          items={[
            {
              id: 'profile',
              label: 'Go to profile',
              icon: <User />,
              onSelect: () => setOpen(false),
            },
            {
              id: 'search',
              label: 'Search products',
              icon: <Search />,
              onSelect: () => setOpen(false),
            },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
