import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Box, Stack, Text } from '@glamui/react';

import { CodeBlock } from './CodeBlock';

const WrapperMargin = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

interface ExampleProps {
  title: string;
  code: string;
  children: ReactNode;
}

export function Example({ title, code, children }: ExampleProps) {
  return (
    <WrapperMargin>
      <Stack gap="sm">
        <Text as="h3" size="sm" weight="semibold">
          {title}
        </Text>
        <Box padding="xl" radius="md" border background="default">
          <Stack direction="row" wrap align="center" gap="md">
            {children}
          </Stack>
        </Box>
        <CodeBlock code={code} />
      </Stack>
    </WrapperMargin>
  );
}
