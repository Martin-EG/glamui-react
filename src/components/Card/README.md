# Card Component

The `Card` component is a flexible container used to group related content and actions. It supports images, titles, body content, footers, and optional menu actions.

## Usage

```tsx
import Card from '../Card';
import Text from '../Text';

const MyComponent = () => {
  return (
    <Card
      title="Card Title"
      image="/path/to/image.jpg"
      body={<Text>Card body content goes here.</Text>}
      footer={<Text size="sm">Footer content</Text>}
      options={[
        { label: 'Edit', onClick: () => {} },
        { label: 'Delete', variant: 'danger', onClick: () => {} },
      ]}
    />
  );
};
```

You can see live demos and various states in Storybook.

## Props

| Prop      | Type                   | Default     | Required | Description                                                      |
| :-------- | :--------------------- | :---------- | :------: | :--------------------------------------------------------------- |
| `title`   | `string`               | -           |   Yes    | The title of the card.                                           |
| `body`    | `ReactNode`            | -           |   Yes    | The main content of the card.                                    |
| `image`   | `string`               | `undefined` |    No    | URL of the image to display at the top of the card.              |
| `footer`  | `ReactNode`            | `undefined` |    No    | Content to display at the bottom of the card.                    |
| `size`    | `'sm' \| 'md' \| 'lg'` | `undefined` |    No    | The size of the card (currently unused in implementation).       |
| `options` | `MenuItem[]`           | `undefined` |    No    | Array of menu items to display in a dropdown menu in the header. |

## Features

### With Menu

You can provide an array of `MenuItem` objects to the `options` prop to display a context menu (kebab menu) in the card header.

```tsx
const options = [
  { label: 'Action 1', onClick: handleAction1 },
  { label: 'Delete', variant: 'danger', onClick: handleDelete },
];

<Card title="Title" body="..." options={options} />;
```

### With Footer

The footer area is useful for auxiliary information or actions.

```tsx
<Card
  title="Product"
  body="..."
  footer={<Button size="sm">Add to Cart</Button>}
/>
```
