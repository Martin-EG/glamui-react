import { fileURLToPath, URL } from 'node:url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@glamui/react/tokens',
        replacement: fileURLToPath(
          new URL('../src/tokens/index.ts', import.meta.url),
        ),
      },
      {
        find: '@glamui/react',
        replacement: fileURLToPath(
          new URL('../src/index.ts', import.meta.url),
        ),
      },
    ],
  },
});
