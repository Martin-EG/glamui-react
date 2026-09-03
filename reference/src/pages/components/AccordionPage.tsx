import { Accordion } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function AccordionPage() {
  return (
    <ComponentPage
      name="Accordion"
      description="An expand/collapse list of question-and-answer items — the FAQ pattern. Only one item is open at a time by default."
      importCode={`import { Accordion } from '@glamui/react';`}
      propRows={[
        { name: 'items', type: '{ id: string; title: ReactNode; content: ReactNode }[]', description: 'Required.' },
        { name: 'allowMultiple', type: 'boolean', default: 'false', description: 'Allows more than one item open at once.' },
        { name: 'defaultExpandedIds', type: 'string[]', description: 'IDs expanded on mount.' },
        { name: 'onItemToggle', type: '(id: string, isExpanded: boolean) => void', description: 'Called whenever an item toggles.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<Accordion
  items={[
    { id: 'shipping', title: 'How long does shipping take?', content: '3-5 business days.' },
    { id: 'returns', title: 'What is your return policy?', content: '30 days, unopened.' },
  ]}
/>`}
      >
        <Accordion
          items={[
            {
              id: 'shipping',
              title: 'How long does shipping take?',
              content: '3-5 business days.',
            },
            {
              id: 'returns',
              title: 'What is your return policy?',
              content: '30 days, unopened.',
            },
          ]}
        />
      </Example>

      <Example
        title="Rich content"
        code={`<Accordion
  items={[
    {
      id: 'billing',
      title: <>What's included in the <strong>Pro</strong> plan?</>,
      content: <>Unlimited items and priority sync. See <a href="#pricing">pricing</a>.</>,
    },
  ]}
/>`}
      >
        <Accordion
          items={[
            {
              id: 'billing',
              title: (
                <>
                  What&apos;s included in the <strong>Pro</strong> plan?
                </>
              ),
              content: (
                <>
                  Unlimited items and priority sync. See{' '}
                  <a href="#pricing">pricing</a>.
                </>
              ),
            },
          ]}
        />
      </Example>
    </ComponentPage>
  );
}
