import type { ReactNode } from 'react';

export interface AccordionItem {
  /** Stable identifier — used for `aria-controls`/`id` wiring and as
   * the value passed to `onItemToggle`. Must be unique within one
   * `Accordion`. */
  readonly id: string;
  /** The always-visible trigger content (a question, in the common FAQ
   * case) — rendered inside the expand/collapse `<button>`, so it also
   * supplies that button's accessible name via accessible-name-from-
   * content. Plain text is the common case; `ReactNode` (e.g. `<strong>`
   * emphasis, an inline icon) is supported, but content must resolve to
   * text when read as the button's name and must not itself contain
   * interactive elements (a nested link or button is invalid inside a
   * `<button>` and inaccessible). */
  readonly question: ReactNode;
  /** The content revealed when this item is expanded. Plain text is the
   * common case; `ReactNode` (links, lists, nested formatting) is
   * supported — the collapsed panel is both `aria-hidden` and `inert`,
   * so any focusable descendants (e.g. a link) are correctly removed
   * from the tab order while collapsed and restored when expanded. */
  readonly answer: ReactNode;
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
