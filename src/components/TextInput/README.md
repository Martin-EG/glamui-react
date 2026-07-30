# TextInput Component

The `TextInput` component allows users to enter text. It supports labels, error states, and different input types (variants).

## Usage

```tsx
import TextInput from '../TextInput';

const MyComponent = () => {
  return (
    <>
      <TextInput label="Username" placeholder="Enter your username" />

      <TextInput label="Email" variant="email" error="Invalid email address" />
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

It supports all standard HTML input attributes.

| Prop      | Type                              | Default  | Required | Description                                                              |
| :-------- | :-------------------------------- | :------- | :------: | :----------------------------------------------------------------------- |
| `label`   | `string`                          | -        |    No    | The label to display above the input field.                              |
| `error`   | `string`                          | -        |    No    | If provided, highlights the input in red and displays the error message. |
| `variant` | `'text' \| 'email' \| 'password'` | `'text'` |    No    | The type of input to render.                                             |
