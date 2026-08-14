import { PasswordInput } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function PasswordInputPage() {
  return (
    <ComponentPage
      name="PasswordInput"
      description="A TextInput with a show/hide toggle. Accepts every TextInput prop except variant and type."
      importCode={`import { PasswordInput } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message.' },
        { name: 'showLabel', type: 'string', default: "'Show password'", description: 'Accessible label for the reveal toggle.' },
        { name: 'hideLabel', type: 'string', default: "'Hide password'", description: 'Accessible label for the hide toggle.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<PasswordInput label="Password" placeholder="Enter your password" />`}
      >
        <PasswordInput label="Password" placeholder="Enter your password" />
      </Example>

      <Example
        title="With error"
        code={`<PasswordInput label="Password" error="Must be at least 8 characters" />`}
      >
        <PasswordInput label="Password" error="Must be at least 8 characters" />
      </Example>
    </ComponentPage>
  );
}
