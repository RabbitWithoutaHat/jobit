import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { theme } from '../config/theme';

export const AppContainer = props => {
  console.log(props.auth);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">{props.children}</Container>
    </ThemeProvider>
  );
};
