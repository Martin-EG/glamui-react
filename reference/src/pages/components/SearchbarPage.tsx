import { useState } from 'react';
import { Searchbar } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function SearchbarPage() {
  const [value, setValue] = useState('');

  return (
    <ComponentPage
      name="Searchbar"
      description="A controlled search field with a built-in clear button."
      importCode={`import { Searchbar } from '@glamui/react';`}
      propRows={[
        { name: 'value', type: 'string', description: 'Controlled value. Required.' },
        { name: 'onChange', type: '(event: ChangeEvent<HTMLInputElement>) => void', description: 'Required.' },
        { name: 'onClear', type: '() => void', description: 'Called when the clear button is pressed.' },
        { name: 'placeholder', type: 'string', description: 'Placeholder text.' },
        { name: 'clearLabel', type: 'string', default: "'Clear'", description: 'Accessible label for the clear button.' },
      ]}
    >
      <Example
        title="Basic"
        code={`const [value, setValue] = useState('');

<Searchbar
  placeholder="Search products"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  onClear={() => setValue('')}
/>`}
      >
        <Searchbar
          placeholder="Search products"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue('')}
        />
      </Example>
    </ComponentPage>
  );
}
