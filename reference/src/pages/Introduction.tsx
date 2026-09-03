import styled from 'styled-components';
import { Text } from '@glamui/react';

import { CodeBlock } from '../shared/CodeBlock';

const TitleWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const LeadWrap = styled.div`
  // max-width: 640px;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const SectionTitleWrap = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
`;

const List = styled.ul`
  padding-left: ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.8;
`;

export function Introduction() {
  return (
    <div>
      <TitleWrap>
        <Text as="h1" variant="heading" size="xxl" weight="bold">
          GlamUI
        </Text>
      </TitleWrap>
      <LeadWrap>
        <Text color="light">
          GlamUI is GlamVault's shared React component library — the source of
          truth for APIs, components, and design tokens. This reference shows
          every component the library offers, its props, and copy-pasteable
          usage examples.
        </Text>
      </LeadWrap>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Install
        </Text>
      </SectionTitleWrap>
      <CodeBlock code="pnpm add @glamui/react styled-components" />

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Set up the theme
        </Text>
      </SectionTitleWrap>
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

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          What's here
        </Text>
      </SectionTitleWrap>
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
