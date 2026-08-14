import { Button, Image } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function ButtonPage() {
  return (
    <ComponentPage
      name="Button"
      description="Standard clickable action. Supports five visual variants, four sizes, and an optional icon."
      importCode={`import { Button } from '@glamui/react';`}
      propRows={[
        { name: 'variant', type: "'primary' | 'secondary' | 'danger' | 'outline' | 'transparent'", default: "'primary'", description: 'Visual style.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Button height and padding.' },
        { name: 'rounded', type: "'full' | 'semi'", description: 'Corner radius style.' },
        { name: 'fullSize', type: 'boolean', default: 'false', description: 'Stretch to fill the parent width.' },
        { name: 'icon', type: 'ReactNode', description: 'Icon rendered alongside the label.' },
        { name: 'iconPosition', type: "'start' | 'end'", default: "'start'", description: 'Where the icon renders relative to the label.' },
        { name: 'disabled', type: 'boolean', description: 'Disables the button.' },
      ]}
    >
      <Example
        title="Variants"
        code={`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="danger">Danger</Button>
<Button variant="transparent">Transparent</Button>`}
      >
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="transparent">Transparent</Button>
      </Example>

      <Example
        title="Sizes"
        code={`<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
      >
        <Button size="xs">Extra small</Button>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Example>

      <Example
        title="With icon"
        code={`<Button icon={<Image />}>Upload image</Button>
<Button icon={<Image />} iconPosition="end">Upload image</Button>`}
      >
        <Button icon={<Image />}>Upload image</Button>
        <Button icon={<Image />} iconPosition="end">
          Upload image
        </Button>
      </Example>

      <Example title="Disabled" code={`<Button disabled>Disabled</Button>`}>
        <Button disabled>Disabled</Button>
      </Example>
    </ComponentPage>
  );
}
