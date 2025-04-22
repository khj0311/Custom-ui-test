import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { customTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={customTheme}>
        <CssBaseline />
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;