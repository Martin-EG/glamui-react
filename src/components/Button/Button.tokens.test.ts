import { themes } from '../../styles/themes';

import { buttonTokens } from './Button.tokens';

describe('buttonTokens.height', () => {
  it.each(['xs', 'sm', 'md', 'lg'] as const)(
    'resolves %s to theme.size.control.%s',
    (size) => {
      expect(buttonTokens.height(themes.light, size)).toBe(
        themes.light.size.control[size],
      );
    },
  );
});
