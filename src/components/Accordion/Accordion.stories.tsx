import type { Meta, StoryObj } from '@storybook/react-vite';

import Accordion from './Accordion';
import type { AccordionItem } from './Accordion.types';

const faqItems: AccordionItem[] = [
  {
    id: 'privacy',
    question: 'Is my collection data private?',
    answer:
      'Yes. Your collection is visible only to you unless you choose to share it.',
  },
  {
    id: 'export',
    question: 'Can I export my data?',
    answer: 'Yes — you can export your full collection at any time.',
  },
  {
    id: 'offline',
    question: 'Does GlamVault work offline?',
    answer:
      'Not yet. GlamVault currently requires an internet connection to sync your collection.',
  },
];

const meta = {
  title: 'GlamUI/Accordion',
  component: Accordion,
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: faqItems,
  },
};

export const OneExpandedByDefault: Story = {
  args: {
    items: faqItems,
    defaultExpandedIds: ['privacy'],
  },
};

export const AllowMultipleOpen: Story = {
  args: {
    items: faqItems,
    allowMultiple: true,
    defaultExpandedIds: ['privacy', 'export'],
  },
};

const richItems: AccordionItem[] = [
  {
    id: 'billing',
    question: (
      <>
        What&apos;s included in the <strong>Pro</strong> plan?
      </>
    ),
    answer: (
      <>
        Unlimited items, priority sync, and export tools. See the{' '}
        <a href="#pricing">full pricing breakdown</a> for details.
      </>
    ),
  },
  {
    id: 'cancel',
    question: 'Can I cancel anytime?',
    answer: (
      <ul>
        <li>Cancel from account settings, no confirmation call needed.</li>
        <li>Access continues until the end of the current billing period.</li>
      </ul>
    ),
  },
];

export const RichContent: Story = {
  args: {
    items: richItems,
  },
};
