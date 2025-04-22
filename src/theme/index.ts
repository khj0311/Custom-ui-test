import { createTheme, Theme } from '@mui/material/styles';

// 커스텀 컬러 팔레트
declare module '@mui/material/styles' {
  interface Palette {
    tertiary?: Palette['primary'];
    customPrimary?: Palette['primary'];
    customSecondary?: Palette['secondary'];
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    customPrimary?: PaletteOptions['primary'];
    customSecondary?: PaletteOptions['secondary'];
  }
}

// 커스텀 타이포그래피 스타일
declare module '@mui/material/styles' {
  interface TypographyVariants {
    customHeading: React.CSSProperties;
    customBody: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    customHeading?: React.CSSProperties;
    customBody?: React.CSSProperties;
  }
}

// 커스텀 Material UI 컴포넌트 스타일 오버라이드
export const customTheme: Theme = createTheme({
  palette: {
    primary: {
      main: '#e9501f',
      light: '#ff8149',
      dark: '#ae2100',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#313131',
      light: '#5a5a5a',
      dark: '#0c0c0c',
      contrastText: '#ffffff',
    },
    tertiary: {
      main: '#ffc107',
      light: '#fff350',
      dark: '#c79100',
      contrastText: '#000000',
    },
    customPrimary: {
      main: '#4caf50',
      light: '#80e27e',
      dark: '#087f23',
      contrastText: '#ffffff',
    },
    customSecondary: {
      main: '#ff9800',
      light: '#ffc947',
      dark: '#c66900',
      contrastText: '#000000',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    customHeading: {
      fontSize: '2.25rem',
      fontWeight: 700,
      lineHeight: 1.2,
    },
    customBody: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          padding: '8px 16px',
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
      variants: [
        {
          props: { variant: 'rounded' },
          style: {
            borderRadius: 24,
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '& fieldset': {
              borderWidth: 1,
            },
            '&:hover fieldset': {
              borderWidth: 2,
            },
            '&.Mui-focused fieldset': {
              borderWidth: 2,
            },
          },
        },
      },
    },
  },
});

export default customTheme;