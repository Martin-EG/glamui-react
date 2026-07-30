export interface AccordionItem {
  /** Stable identifier — used for `aria-controls`/`id` wiring and as
   * the value passed to `onItemToggle`. Must be unique within one
   * `Accordion`. */
  readonly id: string;
  /** The always-visible trigger text (a question, in the common FAQ
   * case) — rendered as the accessible name of its expand/collapse
   * button. */
  readonly question: string;
  /** The content revealed when this item is expanded. */
  readonly answer: string;
}

export interface AccordionProps {
  readonly items: readonly AccordionItem[];
  /**
   * When `true`, more than one item can be expanded at once. Defaults
   * to `false` — the common FAQ pattern, where opening one question
   * closes whichever was previously open, keeps the list scannable
   * rather than growing unboundedly long.
   */
  readonly allowMultiple?: boolean;
  /**
   * IDs of items expanded by default. Defaults to none expanded — an
   * FAQ's job is answering a question the reader already has, not
   * pre-committing them to reading everything.
   */
  readonly defaultExpandedIds?: readonly string[];
  /**
   * Called whenever an item's expanded state changes — the hook a
   * consumer wires analytics through (e.g. a `faq_expand` event),
   * without `Accordion` itself knowing anything about analytics.
   */
  readonly onItemToggle?: (id: string, isExpanded: boolean) => void;
}
