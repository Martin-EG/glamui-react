import type { Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';

import { theme } from '../src/styles/theme';
import { GlobalStyles } from '../src/styles/GlobalStyles';

const preview: Preview = {
  decorators: [
    (Story) => (
      <div style={{ padding: '20px', maxWidth: '100%', maxHeight: '100%' }}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Story />
        </ThemeProvider>
      </div>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;
