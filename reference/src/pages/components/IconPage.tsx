import styled from 'styled-components';
import {
  Box,
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
} from '@glamui/react';

import { ComponentPage } from '../../shared/ComponentPage';
import { Example } from '../../shared/Example';

const icons = {
  Box,
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

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 80px;
  font-size: 11px;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

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
          <Tile key={name}>
            <IconComponent size="lg" />
            {name}
          </Tile>
        ))}
      </Example>
    </ComponentPage>
  );
}
