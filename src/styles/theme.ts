import { lightTheme } from './themes/light';

/**
 * @deprecated Light-only backward-compat alias. Use `themes.light` (or
 * `themes[name]`) from `./themes` instead — this binding can't express
 * the dark theme that already exists alongside it.
 */
export const theme = lightTheme;

export type AppTheme = typeof theme;
