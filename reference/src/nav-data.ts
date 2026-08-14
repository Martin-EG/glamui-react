export interface NavItem {
  label: string;
  slug: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const componentGroups: NavGroup[] = [
  {
    title: 'Actions',
    items: [
      { label: 'Button', slug: 'button' },
      { label: 'IconButton', slug: 'icon-button' },
      { label: 'Clickable', slug: 'clickable' },
      { label: 'SegmentedControl', slug: 'segmented-control' },
    ],
  },
  {
    title: 'Inputs',
    items: [
      { label: 'TextInput', slug: 'text-input' },
      { label: 'TextArea', slug: 'text-area' },
      { label: 'PasswordInput', slug: 'password-input' },
      { label: 'Select', slug: 'select' },
      { label: 'DateInput', slug: 'date-input' },
      { label: 'FileInput', slug: 'file-input' },
      { label: 'Searchbar', slug: 'searchbar' },
      { label: 'Label', slug: 'label' },
    ],
  },
  {
    title: 'Feedback',
    items: [
      { label: 'MessageBar', slug: 'message-bar' },
      { label: 'ProgressRing', slug: 'progress-ring' },
      { label: 'LoadingAnimation', slug: 'loading-animation' },
      { label: 'LoadingOverlay', slug: 'loading-overlay' },
      { label: 'EmptyState', slug: 'empty-state' },
      { label: 'Tooltip', slug: 'tooltip' },
    ],
  },
  {
    title: 'Overlays',
    items: [
      { label: 'Modal', slug: 'modal' },
      { label: 'ImageCropModal', slug: 'image-crop-modal' },
      { label: 'Menu', slug: 'menu' },
      { label: 'CommandPalette', slug: 'command-palette' },
    ],
  },
  {
    title: 'Data display',
    items: [
      { label: 'Avatar', slug: 'avatar' },
      { label: 'Card', slug: 'card' },
      { label: 'Text', slug: 'text' },
      { label: 'Accordion', slug: 'accordion' },
      { label: 'Icon', slug: 'icon' },
    ],
  },
];
