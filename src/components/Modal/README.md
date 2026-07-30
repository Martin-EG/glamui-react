# Modal Component

The `Modal` component displays content in a layer above the app. It is commonly used for dialogs, confirmations, or critical information.

## Usage

```tsx
import { useState } from 'react';
import Modal from '../Modal';
import Button from '../Button';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      {isOpen && (
        <Modal
          title="Confirm Action"
          confirmText="Yes, delete it"
          cancelText="No, keep it"
          onConfirm={() => {
            console.log('Confirmed');
            setIsOpen(false);
          }}
          onCancel={() => setIsOpen(false)}
        >
          <p>Are you sure you want to delete this item?</p>
        </Modal>
      )}
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop          | Type         | Default      | Required | Description                                                        |
| :------------ | :----------- | :----------- | :------: | :----------------------------------------------------------------- |
| `title`       | `string`     | `undefined`  |    No    | The title of the modal.                                            |
| `children`    | `ReactNode`  | -            |   Yes    | The content to be displayed in the modal body.                     |
| `onConfirm`   | `() => void` | -            |   Yes    | Callback function when the primary button is clicked.              |
| `onCancel`    | `() => void` | `undefined`  |    No    | Callback function when the secondary button or overlay is clicked. |
| `confirmText` | `string`     | `'Guardar'`  |    No    | Label for the primary (confirm) button.                            |
| `cancelText`  | `string`     | `'Cancelar'` |    No    | Label for the secondary (cancel) button.                           |
