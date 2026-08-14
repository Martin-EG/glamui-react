import { Text } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function TextPage() {
  return (
    <ComponentPage
      name="Text"
      description="The typography primitive every text string in GlamUI should be rendered through, instead of a raw <p>/<span>."
      importCode={`import { Text } from '@glamui/react';`}
      propRows={[
        { name: 'variant', type: "'body' | 'caption' | 'label' | 'heading' | 'subheading'", default: "'body'", description: 'Semantic style preset.' },
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'", description: 'Overrides the variant’s default size.' },
        { name: 'weight', type: "'regular' | 'medium' | 'semibold' | 'bold'", description: 'Overrides the variant’s default weight.' },
        { name: 'as', type: "'p' | 'span' | 'div' | 'label' | 'h1' | 'h2' | 'h3' | 'h4'", description: 'HTML element rendered.' },
        { name: 'color', type: "'default' | 'light' | 'muted' | 'brand' | 'brandSecondary' | 'danger' | 'error' | 'success' | 'warning' | 'info'", default: "'default'", description: 'Text color.' },
        { name: 'truncate', type: 'boolean | number', description: 'Single-line ellipsis, or clamp to N lines.' },
        { name: 'align', type: "'left' | 'center' | 'right' | 'justify'", description: 'Text alignment.' },
      ]}
    >
      <Example
        title="Variants"
        code={`<Text as="h1" variant="heading">Heading</Text>
<Text as="h2" variant="subheading">Subheading</Text>
<Text variant="body">Body text</Text>
<Text variant="caption">Caption text</Text>
<Text variant="label">Label text</Text>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <Text as="h1" variant="heading">
            Heading
          </Text>
          <Text as="h2" variant="subheading">
            Subheading
          </Text>
          <Text variant="body">Body text</Text>
          <Text variant="caption">Caption text</Text>
          <Text variant="label">Label text</Text>
        </div>
      </Example>

      <Example
        title="Colors"
        code={`<Text color="brand">Brand</Text>
<Text color="danger">Danger</Text>
<Text color="success">Success</Text>
<Text color="muted">Muted</Text>`}
      >
        <Text color="brand">Brand</Text>
        <Text color="danger">Danger</Text>
        <Text color="success">Success</Text>
        <Text color="muted">Muted</Text>
      </Example>
    </ComponentPage>
  );
}
