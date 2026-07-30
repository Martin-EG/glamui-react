# MessageBar Component

The `MessageBar` component is used to communicate status notifications such as errors, warnings, success messages, or information.

## Usage

```tsx
import MessageBar from '../MessageBar';

const MyComponent = () => {
  return (
    <>
      <MessageBar message="Operation failed!" variant="error" />
      <MessageBar message="Data saved successfully." variant="success" />
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop                | Type                                          | Default     | Required | Description                                                    |
| :------------------ | :-------------------------------------------- | :---------- | :------: | :------------------------------------------------------------- |
| `message`           | `string`                                      | `undefined` |   Yes    | The text to display. If undefined, the component renders null. |
| `variant`           | `'error' \| 'success' \| 'warning' \| 'info'` | `'error'`   |    No    | The visual style of the message bar.                           |
| `dismissible`       | `boolean`                                     | `false`     |    No    | If `true`, a close button is rendered.                         |
| `dismissMessageBar` | `() => void`                                  | `undefined` |    No    | Callback function triggered when the close button is clicked.  |
