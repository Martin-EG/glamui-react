import { Select } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function SelectPage() {
  return (
    <ComponentPage
      name="Select"
      description="A native <select> styled to match the rest of the form components."
      importCode={`import { Select } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message.' },
        { name: 'options', type: '{ label: string; value: string; disabled?: boolean }[]', description: 'Options rendered. Required.' },
        { name: 'placeholder', type: 'string', description: 'Placeholder shown as a disabled first option.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { label: 'United States', value: 'us' },
    { label: 'Canada', value: 'ca' },
    { label: 'Mexico', value: 'mx' },
  ]}
/>`}
      >
        <Select
          label="Country"
          placeholder="Select a country"
          options={[
            { label: 'United States', value: 'us' },
            { label: 'Canada', value: 'ca' },
            { label: 'Mexico', value: 'mx' },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
