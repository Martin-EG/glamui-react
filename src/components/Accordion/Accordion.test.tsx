import { fireEvent, render, screen } from '../../test-utils';

import Accordion from './Accordion';
import type { AccordionItem } from './Accordion.types';

const items = [
  { id: 'a', question: 'Is my data private?', answer: 'Yes, always.' },
  { id: 'b', question: 'Can I export my collection?', answer: 'Yes.' },
  { id: 'c', question: 'Does it work offline?', answer: 'Not yet.' },
] satisfies AccordionItem[];

describe('Accordion', () => {
  it('renders every question, with every answer collapsed by default', () => {
    render(<Accordion items={items} />);

    for (const item of items) {
      expect(
        screen.getByRole('button', { name: item.question }),
      ).toHaveAttribute('aria-expanded', 'false');
    }
  });

  it('expands an item on click and marks it aria-expanded', () => {
    render(<Accordion items={items} />);

    fireEvent.click(screen.getByRole('button', { name: items[0].question }));

    expect(
      screen.getByRole('button', { name: items[0].question }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Yes, always.')).toBeVisible();
  });

  it('collapses an expanded item on a second click', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByRole('button', { name: items[0].question });

    fireEvent.click(trigger);
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('only allows one item open at a time by default', () => {
    render(<Accordion items={items} />);

    fireEvent.click(screen.getByRole('button', { name: items[0].question }));
    fireEvent.click(screen.getByRole('button', { name: items[1].question }));

    expect(
      screen.getByRole('button', { name: items[0].question }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(
      screen.getByRole('button', { name: items[1].question }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('allows multiple items open at once when allowMultiple is set', () => {
    render(<Accordion items={items} allowMultiple />);

    fireEvent.click(screen.getByRole('button', { name: items[0].question }));
    fireEvent.click(screen.getByRole('button', { name: items[1].question }));

    expect(
      screen.getByRole('button', { name: items[0].question }),
    ).toHaveAttribute('aria-expanded', 'true');
    expect(
      screen.getByRole('button', { name: items[1].question }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultExpandedIds', () => {
    render(<Accordion items={items} defaultExpandedIds={['b']} />);

    expect(
      screen.getByRole('button', { name: items[1].question }),
    ).toHaveAttribute('aria-expanded', 'true');
  });

  it('calls onItemToggle with the item id and new expanded state', () => {
    const onItemToggle = jest.fn();
    render(<Accordion items={items} onItemToggle={onItemToggle} />);

    fireEvent.click(screen.getByRole('button', { name: items[0].question }));
    expect(onItemToggle).toHaveBeenCalledWith('a', true);

    fireEvent.click(screen.getByRole('button', { name: items[0].question }));
    expect(onItemToggle).toHaveBeenCalledWith('a', false);
  });

  it('moves focus between triggers with ArrowDown/ArrowUp', () => {
    render(<Accordion items={items} />);
    const triggers = items.map((item) =>
      screen.getByRole('button', { name: item.question }),
    );

    triggers[0].focus();
    fireEvent.keyDown(triggers[0], { key: 'ArrowDown' });
    expect(triggers[1]).toHaveFocus();

    fireEvent.keyDown(triggers[1], { key: 'ArrowUp' });
    expect(triggers[0]).toHaveFocus();
  });

  it('wraps focus from the last trigger to the first with ArrowDown', () => {
    render(<Accordion items={items} />);
    const triggers = items.map((item) =>
      screen.getByRole('button', { name: item.question }),
    );

    triggers[2].focus();
    fireEvent.keyDown(triggers[2], { key: 'ArrowDown' });
    expect(triggers[0]).toHaveFocus();
  });

  it('moves focus to the first/last trigger with Home/End', () => {
    render(<Accordion items={items} />);
    const triggers = items.map((item) =>
      screen.getByRole('button', { name: item.question }),
    );

    triggers[1].focus();
    fireEvent.keyDown(triggers[1], { key: 'End' });
    expect(triggers[2]).toHaveFocus();

    fireEvent.keyDown(triggers[2], { key: 'Home' });
    expect(triggers[0]).toHaveFocus();
  });

  it('associates each trigger with its panel via aria-controls/id', () => {
    render(<Accordion items={items} />);
    const trigger = screen.getByRole('button', { name: items[0].question });
    const controlsId = trigger.getAttribute('aria-controls');

    expect(controlsId).toBeTruthy();
    expect(document.getElementById(controlsId as string)).toHaveTextContent(
      'Yes, always.',
    );
  });
});

describe('Accordion with ReactNode content', () => {
  const richItems: AccordionItem[] = [
    {
      id: 'a',
      question: (
        <>
          Is my <strong>data</strong> private?
        </>
      ),
      answer: (
        <>
          Yes — see our <a href="/privacy">privacy policy</a>.
        </>
      ),
    },
  ];

  it('renders a ReactNode question as the trigger content and accessible name', () => {
    render(<Accordion items={richItems} />);

    expect(
      screen.getByRole('button', { name: 'Is my data private?' }),
    ).toBeInTheDocument();
    expect(screen.getByText('data').tagName).toBe('STRONG');
  });

  it('renders a ReactNode answer, including interactive content', () => {
    render(<Accordion items={richItems} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Is my data private?' }),
    );

    expect(
      screen.getByRole('link', { name: 'privacy policy' }),
    ).toBeInTheDocument();
  });

  it('marks the collapsed panel inert, removing focusable answer content from the tab order', () => {
    render(<Accordion items={richItems} />);

    const panel = screen.getByRole('link', {
      name: 'privacy policy',
      hidden: true,
    }).closest('[role="region"]');

    expect(panel).toHaveAttribute('inert', '');
  });

  it('removes inert from the panel once expanded', () => {
    render(<Accordion items={richItems} />);

    fireEvent.click(
      screen.getByRole('button', { name: 'Is my data private?' }),
    );

    const panel = screen.getByRole('region', { hidden: true });
    expect(panel).not.toHaveAttribute('inert');
  });
});
