import { ProgressRing } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function ProgressRingPage() {
  return (
    <ComponentPage
      name="ProgressRing"
      description="Circular determinate progress indicator with a percentage label."
      importCode={`import { ProgressRing } from '@glamui/react';`}
      propRows={[
        { name: 'value', type: 'number', description: '0–100. Values outside that range are clamped. Required.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Ring diameter.' },
        { name: 'label', type: 'string', description: 'Overrides the default `{value}%` center label.' },
      ]}
    >
      <Example
        title="Sizes"
        code={`<ProgressRing value={72} size="sm" />
<ProgressRing value={72} size="md" />
<ProgressRing value={72} size="lg" />`}
      >
        <ProgressRing value={72} size="sm" />
        <ProgressRing value={72} size="md" />
        <ProgressRing value={72} size="lg" />
      </Example>

      <Example title="Custom label" code={`<ProgressRing value={3} label="3/10" />`}>
        <ProgressRing value={30} label="3/10" />
      </Example>
    </ComponentPage>
  );
}
