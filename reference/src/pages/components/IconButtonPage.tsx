import { IconButton, Heart, Close } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function IconButtonPage() {
  return (
    <ComponentPage
      name="IconButton"
      description="A button that renders only an icon. Requires a label for accessibility."
      importCode={`import { IconButton } from '@glamui/react';`}
      propRows={[
        { name: 'icon', type: 'ReactNode', description: 'Icon to render. Required.' },
        { name: 'label', type: 'string', description: 'Accessible name for the button. Required.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<IconButton icon={<Heart />} label="Favorite" />
<IconButton icon={<Close />} label="Close" />`}
      >
        <IconButton icon={<Heart />} label="Favorite" />
        <IconButton icon={<Close />} label="Close" />
      </Example>

      <Example
        title="Disabled"
        code={`<IconButton icon={<Heart />} label="Favorite" disabled />`}
      >
        <IconButton icon={<Heart />} label="Favorite" disabled />
      </Example>
    </ComponentPage>
  );
}
