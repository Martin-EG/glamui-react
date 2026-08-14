import { Button, Card, Edit, Remove, Text } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function CardPage() {
  return (
    <ComponentPage
      name="Card"
      description="A titled content container with an optional image, footer, and a kebab menu for per-card actions."
      importCode={`import { Card } from '@glamui/react';`}
      propRows={[
        { name: 'title', type: 'string', description: 'Card title. Required.' },
        { name: 'image', type: 'string', description: 'Optional image URL rendered above the title.' },
        { name: 'body', type: 'ReactNode', description: 'Main content. Required.' },
        { name: 'footer', type: 'ReactNode', description: 'Optional footer content.' },
        { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Card padding and width.' },
        { name: 'options', type: 'MenuItem[]', description: 'Renders a kebab Menu in the header when present.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<Card
  title="Lipstick - Matte Red"
  image="/dog.jpg"
  body={<Text>A long-wear matte finish in a classic red.</Text>}
  footer={<Button size="sm" fullSize>Add to cart</Button>}
  options={[
    { label: 'Edit', MenuItemIcon: Edit, onClick: () => {} },
    { label: 'Remove', MenuItemIcon: Remove, variant: 'danger', onClick: () => {} },
  ]}
/>`}
      >
        <Card
          title="Lipstick - Matte Red"
          image="/dog.jpg"
          body={<Text>A long-wear matte finish in a classic red.</Text>}
          footer={
            <Button size="sm" fullSize>
              Add to cart
            </Button>
          }
          options={[
            { label: 'Edit', MenuItemIcon: Edit, onClick: () => {} },
            {
              label: 'Remove',
              MenuItemIcon: Remove,
              variant: 'danger',
              onClick: () => {},
            },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
