import { Button, EmptyState, Search } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function EmptyStatePage() {
  return (
    <ComponentPage
      name="EmptyState"
      description="Placeholder shown when a list, search, or page has nothing to display."
      importCode={`import { EmptyState } from '@glamui/react';`}
      propRows={[
        { name: 'icon', type: 'ReactNode', description: 'Decorative illustration or icon. Rendered aria-hidden.' },
        { name: 'title', type: 'string', description: "What's empty, in a few words. Required." },
        { name: 'description', type: 'string', description: 'Optional elaboration.' },
        { name: 'action', type: 'ReactNode', description: 'A single action, usually a Button.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<EmptyState
  icon={<Search />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button variant="outline">Clear filters</Button>}
/>`}
      >
        <EmptyState
          icon={<Search />}
          title="No results found"
          description="Try adjusting your search or filters."
          action={<Button variant="outline">Clear filters</Button>}
        />
      </Example>
    </ComponentPage>
  );
}
