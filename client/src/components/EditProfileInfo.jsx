import React, { useCallback, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginTop: 40,
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
    display: 'flex',
    width: theme.spacing(25),
    height: theme.spacing(25),
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
  profileNicName: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 40,
  },
  form: {
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  button: {
    padding: 0,
    height: 28,
    marginTop: 20,
  },
}))

export default function EditProfileInfo({ setIsEdit }) {
  const classes = useStyles()
  const [form, setForm] = useState({})
  const { token, userId } = useContext(AuthContext)
  const { request, loading } = useHttp()

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    console.log(form)
  }

  const onClickCancel = () => {
    setIsEdit(false)
  }

  const onClickEditProfile = async () => {
    try {
      await request(
        `/api/user`,
        'POST',
        { ...form, id: userId },
        {
          Authorization: `Bearer ${token}`,
        }
      )
    } catch (e) {}
    setIsEdit(false)
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3} lg={2} className={classes.avatarGrid}>
            <Tooltip title="Загрузить фото">
              <Avatar
                className={classes.avatar}
                alt="Remy Sharp"
                src="/static/images/avatar/2.jpg"
              />
            </Tooltip>
          </Grid>
          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              fullWidth
              id="login"
              label="ФИО / Логин"
              name="login"
              value={'asd'}
              onChange={changeHandler}
            />
            <TextField
              fullWidth
              id="location"
              label="Город"
              name="location"
              //   placeholder="Москва"
              onChange={changeHandler}
            />
          </Grid>

          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              // variant="outlined"
              fullWidth
              id="siteUrl"
              type="url"
              label="Site"
              name="siteUrl"
              onChange={changeHandler}
            />
            <TextField
              // variant="outlined"
              fullWidth
              id="gitUrl"
              type="url"
              label="Git"
              name="gitUrl"
              onChange={changeHandler}
            />
          </Grid>

          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <TextField
              // variant="outlined"
              fullWidth
              id="phone"
              type="tel"
              label="Телефон"
              placeholder="8-999-999-99-99"
              name="phone"
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
