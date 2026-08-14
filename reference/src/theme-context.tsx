import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, themes, type ThemeName } from '@glamui/react';

interface ThemeCtx {
  themeName: ThemeName;
  toggleTheme: () => void;
}

const ThemeCtx = createContext<ThemeCtx | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  const value = useMemo(
    () => ({
      themeName,
      toggleTheme: () =>
        setThemeName((current) => (current === 'light' ? 'dark' : 'light')),
    }),
    [themeName],
  );

  return (
    <ThemeCtx.Provider value={value}>
      <ThemeProvider theme={themes[themeName]}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </ThemeCtx.Provider>
  );
}

export function useAppTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useAppTheme must be used within AppThemeProvider');
  return ctx;
}
