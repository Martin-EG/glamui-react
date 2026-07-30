# IconButton Component

The `IconButton` component is a button that contains only an icon, used for actions where text is not necessary or space is limited. It includes accessibility features like `aria-label` and `title`.

## Usage

```tsx
import IconButton from '../IconButton';
import { Camera } from '../Icon';

const MyComponent = () => {
  return (
    <IconButton
      icon={<Camera />}
      label="Take Photo"
      onClick={() => console.log('Photo taken')}
    />
  );
};
```

You can see live demos and usage in Storybook.

## Props

And all standard HTML button attributes.

| Prop    | Type        | Default | Required | Description                                                                     |
| :------ | :---------- | :------ | :------: | :------------------------------------------------------------------------------ |
| `icon`  | `ReactNode` | -       |   Yes    | The icon element to render inside the button.                                   |
| `label` | `string`    | -       |   Yes    | The text description for the button. Used for `aria-label` and tooltip `title`. |
