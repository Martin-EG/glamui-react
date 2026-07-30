import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import prettier from 'eslint-config-prettier';

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  reactHooks.configs['recommended-latest'],
  ...storybook.configs['flat/recommended'],
  prettier,
  {
    rules: {
      '@typescript-eslint/no-empty-object-type': 'off',
    },
  },
  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
    },
  },
  {
    // Guards the five token categories added to close the gaps found by
    // the token-system audit. Scoped narrowly on purpose: it only flags
    // a raw literal where the CSS property name itself makes the token
    // category unambiguous (a duration, an opacity fraction, a z-index,
    // a focus outline). It does NOT cover `size` (too many legitimate
    // one-off pixel values to regex safely), `color`, or `spacing` —
    // this is a partial, honest fix for the categories this round of
    // work introduced, not full token enforcement.
    files: ['src/components/**/*.styles.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'TemplateElement[value.raw=/\\d+(\\.\\d+)?(ms|s)\\b/]',
          message:
            '❌ Raw duration found.\n\n✅ Use theme.motion.duration.* and theme.motion.easing.* instead (see packages/ui/src/tokens/motion.ts).',
        },
        {
          selector: 'TemplateElement[value.raw=/opacity:\\s*0\\.\\d+/]',
          message:
            '❌ Raw opacity value found.\n\n✅ Use theme.opacity.* instead (see packages/ui/src/tokens/opacity.ts).',
        },
        {
          selector: 'TemplateElement[value.raw=/z-index:\\s*\\d+/]',
          message:
            '❌ Raw z-index found.\n\n✅ Use theme.zIndex.* instead (see packages/ui/src/tokens/zIndex.ts).',
        },
        {
          selector:
            'TemplateElement[value.raw=/outline(-offset)?:\\s*\\d+px/]',
          message:
            '❌ Raw focus-ring geometry found.\n\n✅ Use theme.focus.ring.width / theme.focus.ring.offset instead (see packages/ui/src/tokens/focus.ts).',
        },
      ],
    },
  },
  globalIgnores(['dist/**', 'storybook-static/**', 'coverage/**']),
]);

export default eslintConfig;
