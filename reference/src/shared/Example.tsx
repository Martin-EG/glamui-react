import type { ReactNode } from 'react';
import styled from 'styled-components';

import { CodeBlock } from './CodeBlock';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Preview = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface.default};
`;

interface ExampleProps {
  title: string;
  code: string;
  children: ReactNode;
}

export function Example({ title, code, children }: ExampleProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Preview>{children}</Preview>
      <CodeBlock code={code} />
    </Wrapper>
  );
}
