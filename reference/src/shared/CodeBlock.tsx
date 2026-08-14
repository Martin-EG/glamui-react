import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.subtle};
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const Pre = styled.pre`
  margin: 0;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  padding-right: 72px;
  overflow-x: auto;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const CopyButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.spacing.sm};
  right: ${({ theme }) => theme.spacing.sm};
  font-family: inherit;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid transparent;
  background: ${({ theme }) => theme.colors.background.page};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`;

interface CodeBlockProps {
  code: string;
}

export function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Wrapper>
      <Pre>
        <code>{code}</code>
      </Pre>
      <CopyButton type="button" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy'}
      </CopyButton>
    </Wrapper>
  );
}
