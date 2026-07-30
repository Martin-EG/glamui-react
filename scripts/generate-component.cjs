/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please provide a component name.');
  process.exit(1);
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(componentName)) {
  console.error(
    `"${componentName}" is not PascalCase. Component folders are the only ` +
      'PascalCase directories in this package — use e.g. "DatePicker", not "datePicker" or "date-picker".',
  );
  process.exit(1);
}

const componentDir = path.join(
  __dirname,
  '../src/components',
  componentName,
);

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

const { version } = require('../package.json');

fs.mkdirSync(componentDir, { recursive: true });

const indexContent = `export { default } from './${componentName}';
export * from './${componentName}.types';
`;

const typesContent = `import type { ReactNode } from 'react';

export interface ${componentName}Props {
  /** TODO: describe this prop. */
  readonly children?: ReactNode;
}
`;

const stylesContent = `import styled from 'styled-components';

// Replace with real markup once the component takes shape — this only
// demonstrates reading tokens through \`props.theme\`, the one supported way.
export const Styled${componentName} = styled.div\`
  display: flex;
  gap: \${({ theme }) => theme.spacing.sm};
  color: \${({ theme }) => theme.colors.text.primary};
\`;
`;

const componentContent = `import type { FC } from 'react';

import { Styled${componentName} } from './${componentName}.styles';
import type { ${componentName}Props } from './${componentName}.types';

/**
 * TODO: one-line description of what this component is for.
 *
 * @category TODO — Inputs | Actions | Feedback | Overlays | Display | Layout
 * @status experimental
 * @since ${version}
 */
const ${componentName}: FC<${componentName}Props> = ({ children }) => {
  return <Styled${componentName}>{children}</Styled${componentName}>;
};

export default ${componentName};
`;

const storyContent = `import type { Meta, StoryObj } from '@storybook/react-vite';

import ${componentName} from './${componentName}';

const meta = {
  title: 'GlamUI/${componentName}',
  component: ${componentName},
} satisfies Meta<typeof ${componentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;

const testContent = `import { render, screen } from '../../test-utils';

import ${componentName} from './${componentName}';

describe('${componentName}', () => {
  it('renders', () => {
    render(<${componentName}>content</${componentName}>);

    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
`;

const readmeContent = `# ${componentName}

TODO: one or two sentences on what this component is for and when to reach for it.

## Usage

\`\`\`tsx
import ${componentName} from '../${componentName}';

const MyComponent = () => (
  <${componentName}>content</${componentName}>
);
\`\`\`

You can see live demos and usage in Storybook.

## Props

| Prop       | Type        | Default | Required | Description |
| :--------- | :---------- | :------ | :------: | :----------- |
| \`children\` | \`ReactNode\` | -       |    No    | TODO         |

## Foundation notes

<!--
Only keep this section if building this component surfaced a real gap in
the token system (a missing color, spacing value, z-index layer, motion
token, etc.) that you fixed rather than worked around — see Tooltip's
README for an example. Delete this section entirely if nothing came up.
-->
`;

fs.writeFileSync(path.join(componentDir, 'index.ts'), indexContent);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.types.ts`),
  typesContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.styles.ts`),
  stylesContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.tsx`),
  componentContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.stories.tsx`),
  storyContent,
);
fs.writeFileSync(
  path.join(componentDir, `${componentName}.test.tsx`),
  testContent,
);
fs.writeFileSync(path.join(componentDir, 'README.md'), readmeContent);

// Wire the new component into the public barrel automatically — the one
// step the previous version of this script still left for a human to do
// (and to get right alphabetically) by hand.
const barrelPath = path.join(__dirname, '../src/index.ts');
const barrelSource = fs.readFileSync(barrelPath, 'utf8');
const blocks = barrelSource.trimEnd().split('\n\n');

const newBlock = `export { default as ${componentName} } from './components/${componentName}';
export * from './components/${componentName}/${componentName}.types';`;

function blockComponentName(block) {
  const match = block.match(
    /export \{ default as (\w+)|export \* from '\.\/components\/(\w+)'/,
  );
  return match ? match[1] || match[2] : null;
}

let insertAt = blocks.length;
for (let i = 1; i < blocks.length; i += 1) {
  const existingName = blockComponentName(blocks[i]);
  if (existingName && existingName.localeCompare(componentName) > 0) {
    insertAt = i;
    break;
  }
}

blocks.splice(insertAt, 0, newBlock);
fs.writeFileSync(barrelPath, `${blocks.join('\n\n')}\n`);

console.log(`Created component ${componentName} at ${componentDir}`);
console.log(`Wired ${componentName} into src/index.ts.`);
console.log(
  `Next: flesh out ${componentName}.tsx, replace the TODOs in .types.ts, ` +
    'the JSDoc block, README.md, and write real stories/tests.',
);
