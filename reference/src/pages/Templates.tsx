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
  Stack,
  Text,
  TextInput,
} from '@glamui/react';

import { Example } from '../shared/Example';

const TitleWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const LeadWrap = styled.div`
  // max-width: 640px;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

export function Templates() {
  const [query, setQuery] = useState('');

  return (
    <div>
      <TitleWrap>
        <Text as="h1" variant="heading" size="xl" weight="bold">
          Templates
        </Text>
      </TitleWrap>
      <LeadWrap>
        <Text color="light">
          Small examples showing a few GlamUI components composed together,
          for common patterns.
        </Text>
      </LeadWrap>

      <Example
        title="Login form"
        code={`<form>
  <TextInput label="Email" placeholder="you@example.com" />
  <PasswordInput label="Password" />
  <MessageBar variant="error" message="Invalid email or password." />
  <Button type="submit" fullSize>Log in</Button>
</form>`}
      >
        <Stack as="form" gap="md" style={{ width: 320 }}>
          <TextInput label="Email" placeholder="you@example.com" />
          <PasswordInput label="Password" />
          <MessageBar variant="error" message="Invalid email or password." />
          <Button type="submit" fullSize>
            Log in
          </Button>
        </Stack>
      </Example>

      <Example
        title="Profile settings"
        code={`<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Avatar src="/dog.jpg" alt="User" size="lg" editable editAriaLabel="Change photo" />
  <TextInput label="Display name" defaultValue="Jamie Rivera" />
</div>
<Button size="sm">Save changes</Button>`}
      >
        <Stack gap="md">
          <Stack direction="row" align="center" gap="md" style={{ width: 320 }}>
            <Avatar
              src="/dog.jpg"
              alt="User"
              size="lg"
              editable
              editAriaLabel="Change photo"
            />
            <TextInput label="Display name" defaultValue="Jamie Rivera" />
          </Stack>
          <Button size="sm">Save changes</Button>
        </Stack>
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
        <Stack gap="md" style={{ width: '100%' }}>
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
        </Stack>
      </Example>
    </div>
  );
}
