# Text Component

The `Text` component works as the foundation for typography in the application. It handles text styles, variants, weights, colors, and truncation.

## Usage

```tsx
import Text from '../Text';

const MyComponent = () => {
  return (
    <>
      <Text as="h1" variant="heading" size="xl">
        Main Title
      </Text>
      <Text color="muted">Subtitle / Muted Text</Text>
      <Text weight="bold" truncate={1}>
        This is a very long text that will be truncated after 1 line ...
      </Text>
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop       | Type                                            | Default     | Required | Description                                                   |
| :--------- | :---------------------------------------------- | :---------- | :------: | :------------------------------------------------------------ |
| `children` | `ReactNode`                                     | -           |   Yes    | The text content to display.                                  |
| `as`       | `TextAs`                                        | `'p'`       |    No    | The HTML element to render (e.g., `'h1'`, `'span'`, `'div'`, `'code'`). `as="code"` also switches the font to `theme.fonts.mono`. |
| `variant`  | `TextVariant`                                   | `'body'`    |    No    | The semantic style variant (e.g., `'heading'`, `'caption'`).  |
| `size`     | `TextSize`                                      | `'md'`      |    No    | The font size (`'xs'` to `'xxl'`).                            |
| `weight`   | `'regular' \| 'medium' \| 'semibold' \| 'bold'` | `'regular'` |    No    | The font weight.                                              |
| `color`    | `TextColor`                                     | `'default'` |    No    | The text color (uses theme tokens).                           |
| `truncate` | `boolean \| number`                             | `false`     |    No    | Truncate text. `true` (1 line) or number of lines.            |
| `align`    | `'left' \| 'center' \| 'right' \| 'justify'`    | `'left'`    |    No    | Text alignment.                                               |
| `labelFor` | `string`                                        | `undefined` |    No    | The `htmlFor` attribute when `as="label"`.                    |
