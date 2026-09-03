import {
  Calendar,
  Camera,
  Chevron,
  Close,
  Edit,
  Exit,
  Eye,
  EyeOff,
  Heart,
  Icons,
  Image,
  Remove,
  Search,
  Sparkle,
  Stack,
  Star,
  Text,
  Upload,
  User,
} from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

const icons = {
  // `Icons.Box` — the flat `Box` export now resolves to the Box layout
  // component (same name, different thing); reach through the namespace
  // to get the icon, same as any future icon/component name clash.
  Box: Icons.Box,
  Calendar,
  Camera,
  Chevron,
  Close,
  Edit,
  Exit,
  Eye,
  EyeOff,
  Heart,
  Image,
  Remove,
  Search,
  Sparkle,
  Star,
  Upload,
  User,
};

export function IconPage() {
  return (
    <ComponentPage
      name="Icon"
      description="A set of stroke-based SVG icon components, all sharing the same size and color props. Import each by name, or via the Icons namespace."
      importCode={`import { Heart } from '@glamui/react';
// or, namespaced:
import { Icons } from '@glamui/react';
<Icons.Heart />`}
      propRows={[
        { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Icon size.' },
        { name: 'color', type: 'string', description: 'Overrides currentColor.' },
        { name: 'strokeWidth', type: 'number', description: 'SVG stroke width.' },
        { name: 'title', type: 'string', description: 'Accessible title; omit for a purely decorative icon.' },
      ]}
    >
      <Example
        title="All icons"
        code={`<Heart size="md" />
<Star size="md" />
<Search size="md" />
// ...`}
      >
        {Object.entries(icons).map(([name, IconComponent]) => (
          <Stack key={name} align="center" gap="xs" style={{ width: 80 }}>
            <IconComponent size="lg" />
            <Text as="span" size="xs" color="light">
              {name}
            </Text>
          </Stack>
        ))}
      </Example>
    </ComponentPage>
  );
}
