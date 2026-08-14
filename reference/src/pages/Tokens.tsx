import styled, { useTheme } from 'styled-components';
import { tokenManifest, type AppTheme } from '@glamui/react';

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

const SectionTitle = styled.h2`
  font-size: 18px;
  margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.primary};

  &:first-of-type {
    margin-top: 0;
  }
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

const Path = styled.code`
  display: block;
  font-family: 'Menlo', 'Consolas', monospace;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Value = styled.span`
  display: block;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: 2px;
`;

const Row = styled.div`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.subtle};

  &:last-child {
    border-bottom: none;
  }
`;

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
      <Title>Tokens</Title>
      <Lead>
        Design tokens are the primitive and semantic values every GlamUI
        component is built from. Read them through{' '}
        <code>props.theme</code> or <code>useTheme()</code> — never hardcode
        a value that already exists here.
      </Lead>

      <SectionTitle>Colors</SectionTitle>
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

      <SectionTitle>Spacing</SectionTitle>
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

      <SectionTitle>Radius</SectionTitle>
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

      <SectionTitle>Shadows</SectionTitle>
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

      <SectionTitle>Typography</SectionTitle>
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

      <SectionTitle>Motion</SectionTitle>
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
