import { MessageBar } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function MessageBarPage() {
  return (
    <ComponentPage
      name="MessageBar"
      description="Inline banner for surfacing error, success, warning, or info messages."
      importCode={`import { MessageBar } from '@glamui/react';`}
      propRows={[
        { name: 'message', type: 'string | undefined', description: 'Text to show. Renders nothing when falsy. Required.' },
        { name: 'variant', type: "'error' | 'success' | 'warning' | 'info'", default: "'error'", description: 'Visual style.' },
        { name: 'dismissible', type: 'boolean', default: 'false', description: 'Shows a close button.' },
        { name: 'dismissMessageBar', type: '() => void', description: 'Called when the close button is pressed.' },
        { name: 'dismissAriaLabel', type: 'string', default: "'Close'", description: 'Accessible label for the close button.' },
      ]}
    >
      <Example
        title="Variants"
        code={`<MessageBar variant="error" message="Something went wrong." />
<MessageBar variant="success" message="Changes saved." />
<MessageBar variant="warning" message="This action can't be undone." />
<MessageBar variant="info" message="A new version is available." />`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
          <MessageBar variant="error" message="Something went wrong." />
          <MessageBar variant="success" message="Changes saved." />
          <MessageBar variant="warning" message="This action can't be undone." />
          <MessageBar variant="info" message="A new version is available." />
        </div>
      </Example>

      <Example
        title="Dismissible"
        code={`<MessageBar message="Copied to clipboard." variant="success" dismissible />`}
      >
        <MessageBar message="Copied to clipboard." variant="success" dismissible />
      </Example>
    </ComponentPage>
  );
}
