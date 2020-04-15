import React from 'react'
import { ThemeProvider } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import { theme } from '../config/theme'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: 100,
    paddingBottom: 40,
  },
  background: {
    backgroundColor: '#ffff00'
  },
}))

export const AppContainer = props => {
  const classes = useStyles()
  return (
    <ThemeProvider className={classes.background} theme={theme}>
      <Container className={classes.container} maxWidth="lg">
        {props.children}
      </Container>
    </ThemeProvider>
  )
}
