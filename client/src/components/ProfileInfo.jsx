import React, { useCallback, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 40,
    fontSize: 17,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatarGrid: {
    marginRight: 40,
  },
  avatar: {
    width: theme.spacing(25),
    height: theme.spacing(25),
    backgroundColor: theme.palette.secondary.main,
  },
  profileNicName: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 12px',
  },
  button: {
    display: 'flex',
    alignItems: 'end',
    marginTop: 40,
    height: 30,
    marginTop: 62,
  },
  headeProfileName: {
    height: 28,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingTop: 20,
    textOverflow: 'ellipsis',
  },
}))

export default function ProfileInfo({ setIsEdit, user }) {
  const classes = useStyles()

  const onClickEditProfile = () => {
    setIsEdit(true)
  }

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={12} sm={3} lg={2} className={classes.avatarGrid}>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
          />
        </Grid>
        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            Кетурка Владислава
          </Typography>
          <Typography className={classes.headeProfileName}>
            {user.location || null}
          </Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            http://lev.love.krol
          </Typography>
          <Typography className={classes.headeProfileName}>
            https://github.com/Lev3107dfcccccccccccc
          </Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            8-977-975-30-20
          </Typography>
          <Typography className={classes.headeProfileName}>
            if31011997@gmail.com
          </Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Button
            onClick={onClickEditProfile}
            type="submit"
            color="primary"
            className={classes.button}
          >
            Редактировать
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}
