import { DateInput } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function DateInputPage() {
  return (
    <ComponentPage
      name="DateInput"
      description="Text field with a calendar popover for picking a date."
      importCode={`import { DateInput } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message.' },
        { name: 'openCalendarLabel', type: 'string', description: 'Accessible label for the calendar-open button.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<DateInput label="Birthday" openCalendarLabel="Open calendar" />`}
      >
        <DateInput label="Birthday" openCalendarLabel="Open calendar" />
      </Example>
    </ComponentPage>
  );
}
