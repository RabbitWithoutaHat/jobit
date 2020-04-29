import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, IconButton } from '@material-ui/core'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
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
    marginBottom: 40,
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
    color: 'white',
  },
  textItem: {
    height: 28,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingTop: 20,
  },
  input: {
    display: 'none',
  },
  iconAvatarPadding: {
    padding: 0,
  },
}))

export default function EditProfileInfo({ setIsEdit, user }) {
  const classes = useStyles()
  const { token, userId } = useContext(AuthContext)
  const [form, setForm] = useState({})
  const [formImg, setFormImg] = useState()
  const [avatarImage, setAvatarImage] = useState()

  const { request } = useHttp()

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const onClickCancel = () => {
    setIsEdit(false)
  }

  const onFileChange = e => {
    const file = e.target.files[0]
    setFormImg(file)
    setAvatarImage(URL.createObjectURL(file))
  }

  const onClickEditProfile = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append('myImage', formImg)
    formData.append('id', userId)
    formData.append('form', JSON.stringify(form))
    const config = {
      headers: {
        'content-type': 'multipart/form-data: boundary=hzbudhszbduhzsbdhGUVgfYFcTdc',
      },
    }
    axios
      .post('/api/user', formData, config)
      .then(response => {
        setIsEdit(false)
      })
      .catch(error => {})
  }

  return (
    <div className={classes.root}>
      <form className={classes.form} noValidate>
        <Grid container className={classes.container}>
          <Grid item xs={12} sm={3} lg={2}>
            <input
              accept="image/*"
              className={classes.input}
              id="icon-button-file"
              name="myImage"
              type="file"
              onChange={onFileChange}
            />

            <label htmlFor="icon-button-file">
              <IconButton className={classes.iconAvatarPadding} component="span">
                <Tooltip title="Загрузить фото">
                  <Avatar
                    className={classes.avatar}
                    alt={user.login}
                    src={avatarImage || `/images/${user.profileImg}`}
                  />
                </Tooltip>
              </IconButton>
            </label>
          </Grid>
          <Grid className={classes.column} item xs={12} sm={3} lg={2}>
            <Typography className={classes.textItem}> {user.login} </Typography>
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
