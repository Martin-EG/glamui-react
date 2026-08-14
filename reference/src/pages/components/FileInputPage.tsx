import { FileInput } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function FileInputPage() {
  return (
    <ComponentPage
      name="FileInput"
      description="Drag-and-drop / browse file picker with an optional image preview and size validation."
      importCode={`import { FileInput } from '@glamui/react';`}
      propRows={[
        { name: 'label', type: 'string', description: 'Field label.' },
        { name: 'error', type: 'string', description: 'Error message.' },
        { name: 'helperText', type: 'string', description: 'Helper text below the field.' },
        { name: 'maxSizeMB', type: 'number', description: 'Maximum accepted file size in MB.' },
        { name: 'browseLabel', type: 'string', default: "'Browse'", description: 'Label for the browse action.' },
        { name: 'dragLabel', type: 'string', description: 'Label for the drop-zone prompt.' },
        { name: 'orLabel', type: 'string', default: "'or'", description: 'Separator text between drag and browse prompts.' },
        { name: 'initialPreviewUrl', type: 'string | null', description: 'Preloaded preview image URL.' },
        { name: 'onFilesChange', type: '(files: File[]) => void', description: 'Called with the selected files.' },
      ]}
    >
      <Example
        title="Basic"
        code={`<FileInput
  label="Profile photo"
  dragLabel="Drag an image here"
  browseLabel="Browse"
  helperText="PNG or JPG, up to 5MB"
  maxSizeMB={5}
/>`}
      >
        <FileInput
          label="Profile photo"
          dragLabel="Drag an image here"
          browseLabel="Browse"
          helperText="PNG or JPG, up to 5MB"
          maxSizeMB={5}
        />
      </Example>
    </ComponentPage>
  );
}
