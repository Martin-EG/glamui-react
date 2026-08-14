import styled from 'styled-components';
import { Text } from '@glamui/react';

import { CodeBlock } from '../shared/CodeBlock';

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: 32px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Lead = styled.p`
  max-width: 640px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const List = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
`;

export function Introduction() {
  return (
    <div>
      <Title>GlamUI</Title>
      <Lead>
        GlamUI is GlamVault's shared React component library — the source of
        truth for APIs, components, and design tokens. This reference shows
        every component the library offers, its props, and copy-pasteable
        usage examples.
      </Lead>

      <SectionTitle>Install</SectionTitle>
      <CodeBlock code="pnpm add @glamui/react styled-components" />

      <SectionTitle>Set up the theme</SectionTitle>
      <Text>
        Every component reads colors, spacing, and typography from a
        styled-components theme. Wrap your app once at the root:
      </Text>
      <CodeBlock
        code={`import { ThemeProvider } from 'styled-components';
import { themes, GlobalStyles } from '@glamui/react';

function Root() {
  return (
    <ThemeProvider theme={themes.light}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  );
}`}
      />

      <SectionTitle>What's here</SectionTitle>
      <List>
        <li>
          <strong>Tokens</strong> — colors, spacing, typography, radius,
          shadows, and motion values.
        </li>
        <li>
          <strong>Components</strong> — one page per component, grouped by
          purpose, with live variants and props.
        </li>
        <li>
          <strong>Templates</strong> — small examples showing components used
          together.
        </li>
      </List>
    </div>
  );
}
