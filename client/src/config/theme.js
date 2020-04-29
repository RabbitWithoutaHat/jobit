import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0277bd',
    },
    secondary: {
      main: '#e64a19',
    },
  },
  status: {
    danger: 'orange',
  },
  typography: {
    fontFamily: [
      "'Exo 2'",
      'sans-serif',
    ].join(','),
  },
});
