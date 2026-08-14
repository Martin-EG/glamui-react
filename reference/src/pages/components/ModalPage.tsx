import { useState } from 'react';
import { Button, Modal, Text } from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

export function ModalPage() {
  const [open, setOpen] = useState(false);

  return (
    <ComponentPage
      name="Modal"
      description="A confirm/cancel dialog rendered over a full-screen scrim. Renders its own header, body, and footer."
      importCode={`import { Modal } from '@glamui/react';`}
      propRows={[
        { name: 'title', type: 'string', description: 'Header title.' },
        { name: 'cancelText', type: 'string', description: 'Cancel button label.' },
        { name: 'confirmText', type: 'string', description: 'Confirm button label.' },
        { name: 'confirmLoading', type: 'boolean', default: 'false', description: 'Shows a loading state on the confirm button.' },
        { name: 'confirmDisabled', type: 'boolean', default: 'false', description: 'Disables the confirm button.' },
        { name: 'closeLabel', type: 'string', description: 'Accessible label for the header close button.' },
        { name: 'onCancel', type: '() => void', description: 'Called when cancel is pressed.' },
        { name: 'onClose', type: '() => void', description: 'Called when the header close button is pressed.' },
        { name: 'onConfirm', type: '() => void | Promise<void>', description: 'Called when confirm is pressed.' },
      ]}
    >
      <Example
        title="Basic (toggle)"
        code={`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Delete account</Button>

{open && (
  <Modal
    title="Delete account"
    confirmText="Delete"
    cancelText="Cancel"
    onCancel={() => setOpen(false)}
    onClose={() => setOpen(false)}
    onConfirm={() => setOpen(false)}
  >
    <Text>This can't be undone.</Text>
  </Modal>
)}`}
      >
        <Button onClick={() => setOpen(true)}>Delete account</Button>
        {open && (
          <Modal
            title="Delete account"
            confirmText="Delete"
            cancelText="Cancel"
            onCancel={() => setOpen(false)}
            onClose={() => setOpen(false)}
            onConfirm={() => setOpen(false)}
          >
            <Text>This can&apos;t be undone.</Text>
          </Modal>
        )}
      </Example>
    </ComponentPage>
  );
}
