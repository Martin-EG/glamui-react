# ImageCropModal Component

The `ImageCropModal` allows users to crop and zoom an image before uploading or saving it. It wraps `react-easy-crop` inside a standard `Modal`.

## Usage

```tsx
import { useState } from 'react';
import ImageCropModal from '../ImageCropModal';

const MyComponent = () => {
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);

  const handleCropConfirm = (croppedBlob: Blob) => {
    // Upload or display the cropped image
    console.log(croppedBlob);
    setImageToCrop(null);
  };

  return (
    <>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setImageToCrop(URL.createObjectURL(e.target.files[0]));
          }
        }}
      />

      {imageToCrop && (
        <ImageCropModal
          image={imageToCrop}
          onCancel={() => setImageToCrop(null)}
          onConfirm={handleCropConfirm}
        />
      )}
    </>
  );
};
```

You can see live demos and usage in Storybook.

## Props

| Prop        | Type                          | Default | Required | Description                                                                                |
| :---------- | :---------------------------- | :------ | :------: | :----------------------------------------------------------------------------------------- |
| `image`     | `string`                      | -       |   Yes    | The URL of the image to crop.                                                              |
| `onCancel`  | `() => void`                  | -       |   Yes    | Callback function when the user cancels cropping.                                          |
| `onConfirm` | `(croppedBlob: Blob) => void` | -       |   Yes    | Callback function when the user confirms cropping. Receives the cropped image as a `Blob`. |
