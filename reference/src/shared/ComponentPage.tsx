import type { ReactNode } from 'react';
import styled from 'styled-components';

import { CodeBlock } from './CodeBlock';
import { PropsTable, type PropRow } from './PropsTable';

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Description = styled.p`
  margin: 0 0 ${({ theme }) => theme.spacing.lg};
  max-width: 640px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};
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
        <Title>{name}</Title>
        <Description>{description}</Description>
        <CodeBlock code={importCode} />
      </Header>

      <SectionTitle>Examples</SectionTitle>
      {children}

      <SectionTitle>Props</SectionTitle>
      <PropsTable rows={propRows} />
    </div>
  );
}
