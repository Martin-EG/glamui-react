# PasswordInput Component

The `PasswordInput` is a specialized input field for passwords. It includes a toggle button to show or hide the password text.

## Usage

```tsx
import PasswordInput from '../PasswordInput';

const MyComponent = () => {
  return (
    <PasswordInput
      label="Password"
      placeholder="Enter your password"
      onChange={(e) => console.log(e.target.value)}
    />
  );
};
```

You can see live demos and usage in Storybook.

## Props

It inherits all props from [TextInput](../TextInput/README.md), except `variant` and `type`.

| Prop        | Type     | Default                | Required | Description                                                  |
| :---------- | :------- | :--------------------- | :------: | :----------------------------------------------------------- |
| `showLabel` | `string` | `'Mostrar contraseña'` |    No    | `aria-label` for the toggle button when password is hidden.  |
| `hideLabel` | `string` | `'Ocultar contraseña'` |    No    | `aria-label` for the toggle button when password is visible. |
