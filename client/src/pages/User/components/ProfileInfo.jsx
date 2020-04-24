import React, { useCallback, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import AvatarImg from '../../../images/hacker.png'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontSize: 17,
    color: 'white',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 230,
      zIndex: -5,
      marginTop: -40,
      background:
        'linear-gradient(160deg, rgba(63,81,181,1) 0%, rgba(63,95,181,1) 35%, rgba(0,212,255,0.8601190476190477) 100%)',
      width: '100vw',
      left: 0,
    },
  },
  container: {
    justifyContent: 'center',
    marginBottom: 30,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(21),
    height: theme.spacing(21),
    backgroundColor: theme.palette.secondary.main,
  },
  profileNicName: {
    display: 'flex',
    alignItems: 'center',
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
    height: 30,
    marginTop: 62,
    color: 'white',
  },
  textItem: {
    height: 28,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingTop: 20,
    textOverflow: 'ellipsis',
  },
}))

export default function ProfileInfo({ setIsEdit, user, setUser, selectUserId }) {
  const classes = useStyles()
  const { token, userId } = useContext(AuthContext)
  const { request } = useHttp()

  const onClickEditProfile = () => {
    setIsEdit(true)
  }

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${selectUserId || userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(fetched)
    } catch (e) {}
  }, [token, request, setUser, userId, selectUserId])

  useEffect(() => {
    getUser()
  }, [getUser, selectUserId, userId])

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        <Grid item xs={12} sm={3} lg={2}>
          <Avatar className={classes.avatar} alt="Remy Sharp" src={AvatarImg} />
        </Grid>
        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.textItem}>{user.login || null}</Typography>
          <Typography className={classes.textItem}>{selectUserId ? null : user.email || null}</Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.textItem}>{user.location || null}</Typography>
          <Typography className={classes.textItem}>{user.phone || null}</Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.textItem}>{user.gitUrl || null}</Typography>
          <Typography className={classes.textItem}>{user.siteUrl || null}</Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          {selectUserId ? null : (
            <Button onClick={onClickEditProfile} type="submit" color="primary" className={classes.button}>
              Редактировать
            </Button>
          )}
        </Grid>
      </Grid>
    </div>
  )
}
