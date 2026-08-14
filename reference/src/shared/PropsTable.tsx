import styled from 'styled-components';

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.default};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: 600;
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};
  vertical-align: top;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Code = styled.code`
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.brand.secondary};
`;

export function PropsTable({ rows }: { rows: PropRow[] }) {
  return (
    <Table>
      <thead>
        <tr>
          <Th>Prop</Th>
          <Th>Type</Th>
          <Th>Default</Th>
          <Th>Description</Th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.name}>
            <Td>
              <Code>{row.name}</Code>
            </Td>
            <Td>
              <Code>{row.type}</Code>
            </Td>
            <Td>{row.default ? <Code>{row.default}</Code> : '—'}</Td>
            <Td>{row.description}</Td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
