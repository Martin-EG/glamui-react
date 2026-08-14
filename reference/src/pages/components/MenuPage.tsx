import { Edit, Menu, Remove, Box } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function MenuPage() {
  return (
    <ComponentPage
      name="Menu"
      description="A dropdown menu triggered by a kebab button. Items can carry an icon and a danger variant."
      importCode={`import { Menu } from '@glamui/react';`}
      propRows={[
        { name: 'items', type: 'MenuItem[]', description: 'Menu items to render. Required.' },
        { name: 'align', type: "'left' | 'right'", default: "'left'", description: 'Horizontal alignment of the dropdown relative to the trigger.' },
        { name: 'triggerAriaLabel', type: 'string', description: 'Accessible label for the trigger button.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<Menu
  triggerAriaLabel="Open menu"
  items={[
    { label: 'Edit', MenuItemIcon: Edit, onClick: () => {} },
    { label: 'Archive', MenuItemIcon: Box, onClick: () => {} },
    { label: 'Delete', MenuItemIcon: Remove, variant: 'danger', onClick: () => {} },
  ]}
/>`}
      >
        <Menu
          triggerAriaLabel="Open menu"
          items={[
            { label: 'Edit', MenuItemIcon: Edit, onClick: () => {} },
            { label: 'Archive', MenuItemIcon: Box, onClick: () => {} },
            {
              label: 'Delete',
              MenuItemIcon: Remove,
              variant: 'danger',
              onClick: () => {},
            },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
