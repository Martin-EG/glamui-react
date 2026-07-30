'use client';

import { createGlobalStyle } from 'styled-components';

// Motion tokens are published as CSS custom properties so
// prefers-reduced-motion can be honored in one place. Components read
// the theme value as a var() fallback so animation still works if
// <GlobalStyles /> isn't mounted.
export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    --motion-duration-instant: ${({ theme }) => theme.motion.duration.instant};
    --motion-duration-fast: ${({ theme }) => theme.motion.duration.fast};
    --motion-duration-base: ${({ theme }) => theme.motion.duration.base};
    --motion-duration-moderate: ${({ theme }) => theme.motion.duration.moderate};
    --motion-duration-slow: ${({ theme }) => theme.motion.duration.slow};
    --motion-duration-shimmer: ${({ theme }) => theme.motion.duration.shimmer};
    --motion-easing-standard: ${({ theme }) => theme.motion.easing.standard};
    --motion-easing-decelerate: ${({ theme }) => theme.motion.easing.decelerate};
  }

  @media (prefers-reduced-motion: reduce) {
    :root {
      --motion-duration-instant: 0.01ms;
      --motion-duration-fast: 0.01ms;
      --motion-duration-base: 0.01ms;
      --motion-duration-moderate: 0.01ms;
      --motion-duration-slow: 0.01ms;
      --motion-duration-shimmer: 0.01ms;
    }
  }

  body {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.page};
  }`;
