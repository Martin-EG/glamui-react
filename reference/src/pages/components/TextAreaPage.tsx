import { TextArea } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function TextAreaPage() {
  return (
    <ComponentPage
      name="TextArea"
      description="Multi-line text field with the same label and error styling as TextInput."
      importCode={`import { TextArea } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message.' },
        { name: 'resize', type: "'none' | 'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'CSS resize behavior.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<TextArea label="Bio" placeholder="Tell us about yourself" />`}
      >
        <TextArea label="Bio" placeholder="Tell us about yourself" />
      </Example>

      <Example
        title="With error"
        code={`<TextArea label="Bio" error="Bio is required" />`}
      >
        <TextArea label="Bio" error="Bio is required" />
      </Example>
    </ComponentPage>
  );
}
