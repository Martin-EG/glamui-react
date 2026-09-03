'use client';

import { useId, useRef, useState, type FC, type KeyboardEvent } from 'react';

import { Chevron } from '../Icon';
import Text from '../Text';
import {
  AccordionItemRoot,
  AccordionRoot,
  ChevronWrapper,
  Panel,
  PanelContent,
  PanelInner,
  TriggerButton,
} from './Accordion.styles';
import type { AccordionProps } from './Accordion.types';

/**
 * A list of expand/collapse question-and-answer items, one open at a
 * time by default. Built for the landing page's FAQ section (Landing
 * Page Execution Plan §3: "the only place a new `packages/ui` primitive
 * is justified" — no existing GlamUI component provides expand/collapse
 * semantics; `Menu` is a different interaction model, not a fit), but
 * scoped generically since disclosure UI recurs beyond marketing pages.
 *
 * @category Display
 * @status stable
 * @since 0.1.0
 */
const Accordion: FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  defaultExpandedIds = [],
  onItemToggle,
}) => {
  const [expandedIds, setExpandedIds] = useState<ReadonlySet<string>>(
    () => new Set(defaultExpandedIds),
  );
  const idPrefix = useId();
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const toggleItem = (id: string) => {
    setExpandedIds((current) => {
      const isExpanded = current.has(id);
      onItemToggle?.(id, !isExpanded);

      if (allowMultiple) {
        const next = new Set(current);
        if (isExpanded) {
          next.delete(id);
        } else {
          next.add(id);
        }
        return next;
      }

      return isExpanded ? new Set() : new Set([id]);
    });
  };

  // Arrow-key navigation between headers, plus Home/End to jump to the
  // first/last — the WAI-ARIA Authoring Practices' recommended keyboard
  // model for accordions, not just "Tab between buttons." Enter/Space
  // toggling is native <button> behavior and needs no handling here.
  const handleTriggerKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    const triggers = triggerRefs.current;
    const lastIndex = items.length - 1;

    const focusTrigger = (targetIndex: number) => {
      event.preventDefault();
      triggers[targetIndex]?.focus();
    };

    switch (event.key) {
      case 'ArrowDown':
        focusTrigger(index === lastIndex ? 0 : index + 1);
        break;
      case 'ArrowUp':
        focusTrigger(index === 0 ? lastIndex : index - 1);
        break;
      case 'Home':
        focusTrigger(0);
        break;
      case 'End':
        focusTrigger(lastIndex);
        break;
      default:
        break;
    }
  };

  return (
    <AccordionRoot>
      {items.map((item, index) => {
        const isExpanded = expandedIds.has(item.id);
        const triggerId = `${idPrefix}-trigger-${item.id}`;
        const panelId = `${idPrefix}-panel-${item.id}`;

        return (
          <AccordionItemRoot key={item.id}>
            <Text as="h3" variant="body" size="md">
              <TriggerButton
                type="button"
                id={triggerId}
                aria-expanded={isExpanded}
                aria-controls={panelId}
                onClick={() => toggleItem(item.id)}
                onKeyDown={(event) => handleTriggerKeyDown(event, index)}
                ref={(node) => {
                  triggerRefs.current[index] = node;
                }}
              >
                <Text as="span" variant="body" weight="semibold">
                  {item.question}
                </Text>
                <ChevronWrapper $isExpanded={isExpanded} aria-hidden="true">
                  <Chevron size="sm" />
                </ChevronWrapper>
              </TriggerButton>
            </Text>
            <Panel $isExpanded={isExpanded}>
              <PanelInner
                id={panelId}
                role="region"
                aria-labelledby={triggerId}
                aria-hidden={!isExpanded}
                inert={!isExpanded}
              >
                <PanelContent>
                  <Text as="div" variant="body" size="sm">
                    {item.answer}
                  </Text>
                </PanelContent>
              </PanelInner>
            </Panel>
          </AccordionItemRoot>
        );
      })}
    </AccordionRoot>
  );
};

export default Accordion;
