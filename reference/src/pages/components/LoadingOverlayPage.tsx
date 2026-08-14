import { useState } from 'react';
import { Button, LoadingOverlay } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function LoadingOverlayPage() {
  const [visible, setVisible] = useState(false);

  return (
    <ComponentPage
      name="LoadingOverlay"
      description="Full-screen or contained overlay with a LoadingAnimation, for blocking interaction during an async operation."
      importCode={`import { LoadingOverlay } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Accessible label for the animation. Required.' },
        { name: 'fullScreen', type: 'boolean', default: 'true', description: 'Positions fixed over the viewport instead of absolute over the nearest positioned ancestor.' },
      ]}
    >
      <Example
        title="Contained"
        code={`<div style={{ position: 'relative', height: 160 }}>
  <LoadingOverlay label="Loading" fullScreen={false} />
</div>`}
      >
        <div style={{ position: 'relative', height: 160, width: '100%' }}>
          <LoadingOverlay label="Loading" fullScreen={false} />
        </div>
      </Example>

      <Example
        title="Full screen (toggle)"
        code={`const [visible, setVisible] = useState(false);

<Button onClick={() => setVisible(true)}>Show overlay</Button>
{visible && <LoadingOverlay label="Loading" />}`}
      >
        <Button onClick={() => setVisible(true)}>Show overlay</Button>
        {visible && <LoadingOverlay label="Loading" />}
        {visible && (
          <Button
            variant="outline"
            onClick={() => setVisible(false)}
            style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999 }}
          >
            Hide overlay
          </Button>
        )}
      </Example>
    </ComponentPage>
  );
}
