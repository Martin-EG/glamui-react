import { TextInput } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function TextInputPage() {
  return (
    <ComponentPage
      name="TextInput"
      description="Single-line text field with a floating label and error state. Wraps a native <input>."
      importCode={`import { TextInput } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message; shown below the field and switches it to an error style.' },
        { name: 'variant', type: "'text' | 'email' | 'password'", default: "'text'", description: 'Maps to the native input type.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<TextInput label="Email" placeholder="you@example.com" />`}
      >
        <TextInput label="Email" placeholder="you@example.com" />
      </Example>

      <Example
        title="With error"
        code={`<TextInput label="Email" defaultValue="not-an-email" error="Enter a valid email" />`}
      >
        <TextInput
          label="Email"
          defaultValue="not-an-email"
          error="Enter a valid email"
        />
      </Example>

      <Example title="Disabled" code={`<TextInput label="Email" disabled />`}>
        <TextInput label="Email" disabled />
      </Example>
    </ComponentPage>
  );
}
