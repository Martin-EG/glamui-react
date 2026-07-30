# Menu Component

The `Menu` component displays a dropdown list of actions triggered by a button (currently a kebab menu `⋯`). It supports keyboard navigation and accessibility features.

## Usage

```tsx
import Menu from '../Menu';
import { Edit, Remove } from '../Icon';

const MyComponent = () => {
  const menuItems = [
    { label: 'Edit', icon: <Edit />, onClick: () => console.log('Edit') },
    {
      label: 'Delete',
      icon: <Remove />,
      variant: 'danger',
      onClick: () => console.log('Delete'),
    },
  ];

  return <Menu items={menuItems} align="right" />;
};
```

You can see live demos and usage in Storybook.

## Props

### Menu Props

| Prop    | Type                | Default  | Required | Description                                                 |
| :------ | :------------------ | :------- | :------: | :---------------------------------------------------------- |
| `items` | `MenuItem[]`        | -        |   Yes    | An array of items to display in the menu.                   |
| `align` | `'left' \| 'right'` | `'left'` |    No    | The alignment of the dropdown menu relative to the trigger. |

### MenuItem Interface

| Property   | Type                    | Required | Description                                      |
| :--------- | :---------------------- | :------: | :----------------------------------------------- |
| `label`    | `string`                |   Yes    | The text to display for the menu item.           |
| `onClick`  | `() => void`            |   Yes    | Callback function when the item is clicked.      |
| `icon`     | `ReactNode`             |    No    | Optional icon to display next to the label.      |
| `disabled` | `boolean`               |    No    | If `true`, the item is disabled.                 |
| `variant`  | `'default' \| 'danger'` |    No    | Visual style of the item (e.g., red for danger). |
