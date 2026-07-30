// The theme registry. New themes go here, typed against `light`'s
// shape. Components never import a theme directly — they read through
// `props.theme` or `useTheme()`.
import { lightTheme } from './light';
import { darkTheme } from './dark';

// Type guard: every theme must assign the same tokens as `light`.
type ThemeTokens = typeof lightTheme;
const themeTokensGuard: { light: ThemeTokens; dark: ThemeTokens } = {
  light: lightTheme,
  dark: darkTheme,
};

export const themes = themeTokensGuard;

export type ThemeName = keyof typeof themes;

export { lightTheme, darkTheme };
