import { createTheme } from '@mui/material/styles';

// Light mode theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ff6740',
      light: '#ff9e7a',
      dark: '#d04600',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
    success: {
      main: '#28C76F',
      light: '#4CD964',
      dark: '#009624',
      contrastText: '#fff',
    },
    info: {
      main: '#00CFE8',
      light: '#64E4FF',
      dark: '#00AEEF',
      contrastText: '#fff',
    },
    warning: {
      main: '#FF9F43',
      light: '#ffcc80',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    error: {
      main: '#EA5455',
      light: '#FF7172',
      dark: '#D32F2F',
      contrastText: '#fff',
    },
  },
});

// Dark mode theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff6740',
      light: '#ff9e7a',
      dark: '#d04600',
      contrastText: '#fff',
    },
    secondary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    success: {
      main: '#28C76F',
      light: '#4CD964',
      dark: '#009624',
      contrastText: '#fff',
    },
    info: {
      main: '#00CFE8',
      light: '#64E4FF',
      dark: '#00AEEF',
      contrastText: '#fff',
    },
    warning: {
      main: '#FF9F43',
      light: '#ffcc80',
      dark: '#f57c00',
      contrastText: '#fff',
    },
    error: {
      main: '#EA5455',
      light: '#FF7172',
      dark: '#D32F2F',
      contrastText: '#fff',
    },
  },
});

export { lightTheme, darkTheme };