import React, { useCallback, useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontSize: 17,
    color: 'white',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 250,
      zIndex: -5,
      marginTop: -40,
      backgroundColor: '#76767661',
      width: '100vw',
      left: 0,
    },
  },
  // background: {
  //   position: 'absolute',
  //   backgroundColor: 'gray',
  //   width: '100vw',
  //   left: 0,
  // },
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
  },
  headeProfileName: {
    height: 28,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingTop: 20,
    textOverflow: 'ellipsis',
  },
}))

export default function ProfileInfo({ setIsEdit, user, setUser }) {
  const classes = useStyles()
  const { token, userId } = useContext(AuthContext)
  const { request } = useHttp()

  const onClickEditProfile = () => {
    setIsEdit(true)
  }

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(fetched)
    } catch (e) {}
  }, [token, request, setUser, userId])

  useEffect(() => {
    getUser()
  }, [getUser])

  return (
    <div className={classes.root}>
      <Grid className={classes.container} container>
        <Grid item xs={12} sm={3} lg={2} className={classes.avatarGrid}>
          <Avatar
            className={classes.avatar}
            alt="Remy Sharp"
            src="/static/images/avatar/2.jpg"
          />
        </Grid>
        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            {user.login || null}
          </Typography>
          <Typography className={classes.headeProfileName}>
            {user.email || null}
          </Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            {user.location || null}
          </Typography>
          <Typography className={classes.headeProfileName}>
            {user.phone || null}
          </Typography>
        </Grid>

        <Grid className={classes.column} item xs={12} sm={3} lg={2}>
          <Typography className={classes.headeProfileName}>
            {user.gitUrl || null}
          </Typography>
          <Typography className={classes.headeProfileName}>
            {user.siteUrl || null}
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
