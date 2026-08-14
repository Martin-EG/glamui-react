import { useState } from 'react';
import { Button, ImageCropModal } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function ImageCropModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPage
      name="ImageCropModal"
      description="A Modal preconfigured with a drag/zoom crop area, for cropping an uploaded image before saving it."
      importCode={`import { ImageCropModal } from '@glamui/react';`}
      propRows={[
        { name: 'image', type: 'string', description: 'Source URL of the image to crop. Required.' },
        { name: 'cancelText', type: 'string', default: "'Cancel edition'", description: 'Cancel button label.' },
        { name: 'onCancel', type: '() => void', description: 'Called on cancel. Required.' },
        { name: 'onConfirm', type: '(croppedBlob: Blob) => void', description: 'Called with the cropped image blob. Required.' },
      ]}
    >
      <Example
        title="Basic (toggle)"
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Crop image</Button>

{open && (
  <ImageCropModal
    image="/dog.jpg"
    onCancel={() => setOpen(false)}
    onConfirm={() => setOpen(false)}
  />
)}`}
      >
        <Button onClick={() => setOpen(true)}>Crop image</Button>
        {open && (
          <ImageCropModal
            image="/dog.jpg"
            onCancel={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          />
        )}
      </Example>
    </ComponentPage>
  );
}
