import { useState } from 'react';
import styled from 'styled-components';
import {
  Avatar,
  Button,
  EmptyState,
  MessageBar,
  PasswordInput,
  Search,
  Searchbar,
  TextInput,
} from '@glamui/react';

import { Example } from '../shared/Example';

const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
  font-size: 28px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Lead = styled.p`
  max-width: 640px;
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  width: 320px;
`;

const ProfileRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  width: 320px;
`;

export function Templates() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <Title>Templates</Title>
      <Lead>
        Small examples showing a few GlamUI components composed together, for
        common patterns.
      </Lead>

      <Example
        title="Login form"
        code={`<form>
  <TextInput label="Email" placeholder="you@example.com" />
  <PasswordInput label="Password" />
  <MessageBar variant="error" message="Invalid email or password." />
  <Button type="submit" fullSize>Log in</Button>
</form>`}
      >
        <Form>
          <TextInput label="Email" placeholder="you@example.com" />
          <PasswordInput label="Password" />
          <MessageBar variant="error" message="Invalid email or password." />
          <Button type="submit" fullSize>
            Log in
          </Button>
        </Form>
      </Example>

      <Example
        title="Profile settings"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Avatar src="/dog.jpg" alt="User" size="lg" editable editAriaLabel="Change photo" />
  <TextInput label="Display name" defaultValue="Jamie Rivera" />
</div>
<Button size="sm">Save changes</Button>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ProfileRow>
            <Avatar
              src="/dog.jpg"
              alt="User"
              size="lg"
              editable
              editAriaLabel="Change photo"
            />
            <TextInput label="Display name" defaultValue="Jamie Rivera" />
          </ProfileRow>
          <Button size="sm">Save changes</Button>
        </div>
      </Example>

      <Example
        title="Search with empty state"
        code={`const [query, setQuery] = useState('');

<Searchbar
  placeholder="Search products"
  value={query}
  onChange={(e) => setQuery(e.target.value)}
  onClear={() => setQuery('')}
/>
<EmptyState
  icon={<Search />}
  title="No results found"
  description="Try adjusting your search or filters."
  action={<Button variant="outline">Clear filters</Button>}
/>`}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <Searchbar
            placeholder="Search products"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onClear={() => setQuery('')}
          />
          <EmptyState
            icon={<Search />}
            title="No results found"
            description="Try adjusting your search or filters."
            action={<Button variant="outline">Clear filters</Button>}
          />
        </div>
      </Example>
    </div>
  );
}
