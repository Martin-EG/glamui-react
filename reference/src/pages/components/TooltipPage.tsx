import { Button, Tooltip } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function TooltipPage() {
  return (
    <ComponentPage
      name="Tooltip"
      description="Shows a label on hover or keyboard focus of its single child element."
      importCode={`import { Tooltip } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'ReactNode', description: "The tooltip's content. Required." },
        { name: 'children', type: 'ReactElement', description: 'A single element that triggers the tooltip. Required.' },
        { name: 'placement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Side the tooltip renders on.' },
      ]}
    >
      <Example
        title="Placements"
        code={`<Tooltip label="Saves your changes" placement="top">
  <Button variant="outline">Top</Button>
</Tooltip>
<Tooltip label="Saves your changes" placement="right">
  <Button variant="outline">Right</Button>
</Tooltip>
<Tooltip label="Saves your changes" placement="bottom">
  <Button variant="outline">Bottom</Button>
</Tooltip>
<Tooltip label="Saves your changes" placement="left">
  <Button variant="outline">Left</Button>
</Tooltip>`}
      >
        <Tooltip label="Saves your changes" placement="top">
          <Button variant="outline">Top</Button>
        </Tooltip>
        <Tooltip label="Saves your changes" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
        <Tooltip label="Saves your changes" placement="bottom">
          <Button variant="outline">Bottom</Button>
        </Tooltip>
        <Tooltip label="Saves your changes" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
      </Example>
    </ComponentPage>
  );
}
