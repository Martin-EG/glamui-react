import { LoadingAnimation } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function LoadingAnimationPage() {
  return (
    <ComponentPage
      name="LoadingAnimation"
      description="A frame-based loading spinner, sourced from /public/loader in the consuming app."
      importCode={`import { LoadingAnimation } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Accessible label for the animation. Required.' },
        { name: 'basePath', type: 'string', default: "'/loader'", description: 'Path the frame-N.svg assets are served from.' },
      ]}
    >
      <Example title="Basic" code={`<LoadingAnimation label="Loading" />`}>
        <LoadingAnimation label="Loading" />
      </Example>
    </ComponentPage>
  );
}
