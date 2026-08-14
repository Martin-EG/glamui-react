import type { ReactNode } from 'react';
import styled from 'styled-components';

import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Body = styled.div`
  display: flex;
  flex: 1;
  min-height: 0;
`;

const Main = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.xl} 40px;
`;

const Content = styled.div`
  max-width: 920px;
`;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <Layout>
      <TopBar />
      <Body>
        <Sidebar />
        <Main>
          <Content>{children}</Content>
        </Main>
      </Body>
    </Layout>
  );
}
