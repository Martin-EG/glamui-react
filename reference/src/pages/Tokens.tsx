import type { CSSProperties, ReactNode } from 'react';
import styled, { useTheme } from 'styled-components';
import { Stack, Text, tokenManifest, type AppTheme } from '@glamui/react';

const TitleWrap = styled.div`
  margin: 0 0 ${({ theme }) => theme.spacing.sm};
`;

const LeadWrap = styled.div`
  // max-width: 640px;
  margin: 0 0 ${({ theme }) => theme.spacing.xl};
`;

const SectionTitleWrap = styled.div<{ $first?: boolean }>`
  margin: ${({ theme, $first }) => ($first ? 0 : theme.spacing.xl)} 0 ${({ theme }) => theme.spacing.md};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

const Swatch = styled.div<{ $bg: string }>`
  height: 56px;
  background: ${({ $bg }) => $bg};
`;

const CardBody = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
`;

const Path = ({
  children,
  style,
}: {
  children: string;
  style?: CSSProperties;
}) => (
  <Text as="code" size="xs" style={{ display: 'block', ...style }}>
    {children}
  </Text>
);

const Value = ({ children }: { children: ReactNode }) => (
  <Text as="span" size="xs" color="muted" style={{ display: 'block', marginTop: 2 }}>
    {children}
  </Text>
);

const RowWrap = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`;

function Row({ children }: { children: ReactNode }) {
  return (
    <RowWrap>
      <Stack direction="row" align="baseline" gap="md">
        {children}
      </Stack>
    </RowWrap>
  );
}

function getByPath(theme: AppTheme, path: string): string {
  const value = path
    .split('.')
    .reduce<unknown>(
      (acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined),
      theme,
    );
  return typeof value === 'string' || typeof value === 'number'
    ? String(value)
    : '—';
}

function entriesFor(prefix: string) {
  return tokenManifest.entries.filter(
    (entry) => entry.path.startsWith(`${prefix}.`) && !entry.deprecated,
  );
}

export function Tokens() {
  const theme = useTheme() as AppTheme;

  const colorEntries = entriesFor('colors');
  const spacingEntries = entriesFor('spacing');
  const radiusEntries = entriesFor('radius');
  const shadowEntries = entriesFor('shadows');
  const typographySizeEntries = tokenManifest.entries.filter((e) =>
    e.path.startsWith('typography.sizes.'),
  );
  const typographyWeightEntries = tokenManifest.entries.filter((e) =>
    e.path.startsWith('typography.weights.'),
  );
  const motionEntries = tokenManifest.entries.filter((e) =>
    e.path.startsWith('motion.duration.'),
  );

  return (
    <div>
      <TitleWrap>
        <Text as="h1" variant="heading" size="xl" weight="bold">
          Tokens
        </Text>
      </TitleWrap>
      <LeadWrap>
        <Text color="light">
          Design tokens are the primitive and semantic values every GlamUI
          component is built from. Read them through{' '}
          <code>props.theme</code> or <code>useTheme()</code> — never
          hardcode a value that already exists here.
        </Text>
      </LeadWrap>

      <SectionTitleWrap $first>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Colors
        </Text>
      </SectionTitleWrap>
      <Grid>
        {colorEntries.map((entry) => (
          <Card key={entry.path}>
            <Swatch $bg={getByPath(theme, entry.path)} />
            <CardBody>
              <Path>{entry.path}</Path>
              <Value>{getByPath(theme, entry.path)}</Value>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Spacing
        </Text>
      </SectionTitleWrap>
      <Card>
        <CardBody>
          {spacingEntries.map((entry) => (
            <Row key={entry.path}>
              <Path style={{ width: 140 }}>{entry.path}</Path>
              <div
                style={{
                  height: 14,
                  width: getByPath(theme, entry.path),
                  background: theme.colors.brand.primary,
                  borderRadius: 2,
                }}
              />
              <Value>{getByPath(theme, entry.path)}</Value>
            </Row>
          ))}
        </CardBody>
      </Card>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Radius
        </Text>
      </SectionTitleWrap>
      <Grid>
        {radiusEntries.map((entry) => (
          <Card key={entry.path}>
            <Swatch
              $bg={theme.colors.brand.primaryAlpha}
              style={{ borderRadius: getByPath(theme, entry.path) }}
            />
            <CardBody>
              <Path>{entry.path}</Path>
              <Value>{getByPath(theme, entry.path)}</Value>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Shadows
        </Text>
      </SectionTitleWrap>
      <Grid>
        {shadowEntries.map((entry) => (
          <Card key={entry.path} style={{ border: 'none' }}>
            <CardBody
              style={{
                background: theme.colors.surface.default,
                boxShadow: getByPath(theme, entry.path),
                borderRadius: 8,
                height: 56,
              }}
            />
            <CardBody>
              <Path>{entry.path}</Path>
            </CardBody>
          </Card>
        ))}
      </Grid>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Typography
        </Text>
      </SectionTitleWrap>
      <Card>
        <CardBody>
          {typographySizeEntries.map((entry) => (
            <Row key={entry.path}>
              <Path style={{ width: 160 }}>{entry.path}</Path>
              <span
                style={{
                  fontSize: getByPath(theme, entry.path),
                  color: theme.colors.text.primary,
                }}
              >
                Aa
              </span>
              <Value>{getByPath(theme, entry.path)}</Value>
            </Row>
          ))}
          {typographyWeightEntries.map((entry) => (
            <Row key={entry.path}>
              <Path style={{ width: 160 }}>{entry.path}</Path>
              <span
                style={{
                  fontWeight: Number(getByPath(theme, entry.path)),
                  color: theme.colors.text.primary,
                }}
              >
                Aa
              </span>
              <Value>{getByPath(theme, entry.path)}</Value>
            </Row>
          ))}
        </CardBody>
      </Card>

      <SectionTitleWrap>
        <Text as="h2" variant="subheading" size="lg" weight="semibold">
          Motion
        </Text>
      </SectionTitleWrap>
      <Card>
        <CardBody>
          {motionEntries.map((entry) => (
            <Row key={entry.path}>
              <Path style={{ width: 200 }}>{entry.path}</Path>
              <Value>{getByPath(theme, entry.path)}</Value>
            </Row>
          ))}
        </CardBody>
      </Card>
    </div>
  );
}
