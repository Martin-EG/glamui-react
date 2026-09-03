import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Text } from '@glamui/react';

import { CodeBlock } from './CodeBlock';
import { PropsTable, type PropRow } from './PropsTable';

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TitleWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const DescriptionWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  max-width: 640px;
`;

const SectionTitleWrap = styled.div`
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
`;

interface ComponentPageProps {
  name: string;
  description: string;
  importCode: string;
  propRows: PropRow[];
  children: ReactNode;
}

export function ComponentPage({
  name,
  description,
  importCode,
  propRows,
  children,
}: ComponentPageProps) {
  return (
    <div>
      <Header>
        <TitleWrap>
          <Text as="h1" variant="heading" size="xl" weight="bold">
            {name}
          </Text>
        </TitleWrap>
        <DescriptionWrap>
          <Text color="light">{description}</Text>
        </DescriptionWrap>
        <CodeBlock code={importCode} />
      </Header>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Examples
        </Text>
      </SectionTitleWrap>
      {children}

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Props
        </Text>
      </SectionTitleWrap>
      <PropsTable rows={propRows} />
    </div>
  );
}
