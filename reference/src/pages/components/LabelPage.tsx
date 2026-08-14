import { Label } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function LabelPage() {
  return (
    <ComponentPage
      name="Label"
      description="A standalone form label. Most form components (TextInput, Select, ...) render their own label — use this when building a custom field."
      importCode={`import { Label } from '@glamui/react';`}
      propRows={[
        { name: 'text', type: 'string', description: 'Label text. Required.' },
        { name: 'htmlFor', type: 'string', description: 'ID of the associated form control.' },
      ]}
    >
      <Example title="Basic" code={`<Label text="Email address" htmlFor="email" />`}>
        <Label text="Email address" htmlFor="email" />
      </Example>
    </ComponentPage>
  );
}
