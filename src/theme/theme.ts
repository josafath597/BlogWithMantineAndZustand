import { createTheme, rem } from '@mantine/core';

const theme = createTheme({
  colors: {
    dark: ['#C9C9C9', '#B8B8B8', '#828282', '#696969', '#424242', '#3B3B3B', '#2E2E2E', '#0a0f23', '#1F1F1F', '#141414'],
    'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
  },
  primaryColor: 'bright-pink',
  autoContrast: true,
  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  },
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'monospace',
    sizes: {
      h1: { fontSize: rem(36) },
    },
  },
});

export default theme;
