import React from 'react';
import PrimarySearchAppBar from './NavBar';
import { ThemeProvider } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import { theme } from '../config/theme';

export const AppContainer = props => {
  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />
      <Container maxWidth="lg">{props.children}</Container>
    </ThemeProvider>
  );
};
