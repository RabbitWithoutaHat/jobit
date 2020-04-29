import React from 'react'
import { makeStyles, Card, CardContent, Typography, Button, Grid, Divider } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import AvatarImg from '../images/chat.png'
// import Loader from '../../../common/Loader'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textFild: {
    color: '#b7b7b7',
    marginTop: '23px',
    fontSize: '2rem,'
  },
}))

export function ListPlaceholder() {
  const classes = useStyles()

  return (
    <Grid className={classes.root}>
      <Typography className={classes.textFild} variant="h5" component="h2">
        Здесь будут храниться Ваши отзывы
      </Typography>
    </Grid>
  )
}
