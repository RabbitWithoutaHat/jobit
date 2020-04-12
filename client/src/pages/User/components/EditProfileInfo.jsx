import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontSize: 17,
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 250,
      zIndex: -5,
      marginTop: -40,
      background: 'linear-gradient(180deg, rgba(63,81,181,1) 0%, rgba(63,95,181,1) 35%, rgba(0,212,255,0.8601190476190477) 100%)',
      width: '100vw',
      left: 0,
    },
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
  },
  form: {
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 12px',
  },
  button: {
    padding: 0,
    height: 28,
    marginTop: 20,
    color: 'white'
  },
  input: {
    color: 'white',
  },
}))

export default function EditProfileInfo({ setIsEdit, user }) {
  const classes = useStyles()
  const [form, setForm] = useState({})
  const { token, userId } = useContext(AuthContext)
  const { request } = useHttp()

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onClickCancel = () => {
    setIsEdit(false)
  }

  const onClickEditProfile = async event => {
    event.preventDefault()
    try {
      await request(
        `/api/user`,
        'POST',
        { ...form, id: userId },
        {
          Authorization: `Bearer ${token}`,
        },
      )
    } catch (e) {}
    setIsEdit(false)
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <Grid container >
          <Grid item xs={12} sm={3} lg={2} className={classes.avatarGrid}>
            <Tooltip title="Загрузить фото">
              <Avatar
                className={classes.avatar}
                alt="Remy Sharp"
                src="/static/img/avatar/2.jpg"
              />
            </Tooltip>
          </Grid>
          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              fullWidth
              id="login"
              label="ФИО / Логин"
              name="login"
              defaultValue={user.login}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="password"
              type="password"
              label="Пароль"
              name="password"
              onChange={changeHandler}
            />
          </Grid>

          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              fullWidth
              id="location"
              label="Город"
              name="location"
              defaultValue={user.location}
              onChange={changeHandler}
            />
            <TextField
              // variant="outlined"
              fullWidth
              id="phone"
              type="tel"
              label="Телефон"
              name="phone"
              defaultValue={user.phone}
              onChange={changeHandler}
            />
          </Grid>

          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              fullWidth
              id="gitUrl"
              type="url"
              label="Git"
              name="gitUrl"
              defaultValue={user.gitUrl}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="siteUrl"
              type="url"
              label="Site"
              name="siteUrl"
              defaultValue={user.siteUrl}
              onChange={changeHandler}
            />
          </Grid>

          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <Button
              onClick={onClickCancel}
              type="submit"
              color="primary"
              className={classes.button}

            >
              Отмена
            </Button>

            <Button
              onClick={onClickEditProfile}
              type="submit"
              color="primary"
              className={classes.button}
            >
              Сохранить
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}
