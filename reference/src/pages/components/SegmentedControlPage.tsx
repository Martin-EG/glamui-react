import { useState } from 'react';
import { SegmentedControl } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function SegmentedControlPage() {
  const [value, setValue] = useState('week');

  return (
    <ComponentPage
      name="SegmentedControl"
      description="A single-choice control for switching between a small set of options, rendered as connected segments."
      importCode={`import { SegmentedControl } from '@glamui/react';`}
      propRows={[
        { name: 'options', type: '{ label: string; value: string }[]', description: 'Segments to render. Required.' },
        { name: 'value', type: 'string', description: 'Currently selected value. Required.' },
        { name: 'onChange', type: '(value: string) => void', description: 'Called when a segment is selected. Required.' },
        { name: "'aria-label'", type: 'string', description: 'Accessible name for the control. Required.' },
      ]}
    >
      <Example
        title="Basic"
        code={`const [value, setValue] = useState('week');

<SegmentedControl
  aria-label="Time range"
  value={value}
  onChange={setValue}
  options={[
    { label: 'Day', value: 'day' },
    { label: 'Week', value: 'week' },
    { label: 'Month', value: 'month' },
  ]}
/>`}
      >
        <SegmentedControl
          aria-label="Time range"
          value={value}
          onChange={setValue}
          options={[
            { label: 'Day', value: 'day' },
            { label: 'Week', value: 'week' },
            { label: 'Month', value: 'month' },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
