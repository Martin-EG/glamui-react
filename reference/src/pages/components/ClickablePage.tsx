import { Box, Clickable, Text } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function ClickablePage() {
  return (
    <ComponentPage
      name="Clickable"
      description="A <div> that behaves like a button, with keyboard and ARIA semantics built in. Use it when a clickable area needs layout a native <button> or Button component's row layout can't express."
      importCode={`import { Clickable } from '@glamui/react';`}
      propRows={[
        { name: 'onClick', type: '() => void', description: 'Called on click, Enter, or Space. Required.' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables interaction and removes it from tab order.' },
      ]}
    >
      <Example
        title="Custom layout"
        code={`<Clickable onClick={() => {}}>
  <div style={{ padding: 12, border: '1px solid #ddd', borderRadius: 8, width: 160 }}>
    <Text weight="bold">Plan card</Text>
    <Text size="sm" color="muted">Tap to select</Text>
  </div>
</Clickable>`}
      >
        <Clickable onClick={() => {}}>
          <Box padding="md" border radius="md" style={{ width: 160 }}>
            <Text weight="bold">Plan card</Text>
            <Text size="sm" color="muted">
              Tap to select
            </Text>
          </Box>
        </Clickable>
      </Example>
    </ComponentPage>
  );
}
