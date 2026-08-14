import { Avatar } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function AvatarPage() {
  return (
    <ComponentPage
      name="Avatar"
      description="A user photo, with a fallback and optional edit affordance and loading skeleton."
      importCode={`import { Avatar } from '@glamui/react';`}
      propRows={[
        { name: 'src', type: 'string | null', description: 'Image URL. Falls back to a placeholder when absent.' },
        { name: 'alt', type: 'string', description: 'Alt text.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar diameter.' },
        { name: 'editable', type: 'boolean', default: 'false', description: 'Shows an edit affordance overlay.' },
        { name: 'loading', type: 'boolean', default: 'false', description: 'Renders a skeleton instead of the image.' },
        { name: 'onClick', type: '() => void', description: 'Called when the avatar (or its edit affordance) is pressed.' },
        { name: 'editAriaLabel', type: 'string', description: 'Accessible label for the edit affordance.' },
      ]}
    >
      <Example
        title="Sizes"
        code={`<Avatar src="/dog.jpg" alt="User" size="sm" />
<Avatar src="/dog.jpg" alt="User" size="md" />
<Avatar src="/dog.jpg" alt="User" size="lg" />`}
      >
        <Avatar src="/dog.jpg" alt="User" size="sm" />
        <Avatar src="/dog.jpg" alt="User" size="md" />
        <Avatar src="/dog.jpg" alt="User" size="lg" />
      </Example>

      <Example
        title="Editable"
        code={`<Avatar src="/dog.jpg" alt="User" editable editAriaLabel="Change photo" onClick={() => {}} />`}
      >
        <Avatar
          src="/dog.jpg"
          alt="User"
          editable
          editAriaLabel="Change photo"
          onClick={() => {}}
        />
      </Example>

      <Example title="Loading" code={`<Avatar loading />`}>
        <Avatar loading />
      </Example>
    </ComponentPage>
  );
}
