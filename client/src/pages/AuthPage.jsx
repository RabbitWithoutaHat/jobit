import React, { useEffect, useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useHttp } from '../hooks/http.hook'
import Snackbar from '@material-ui/core/Snackbar'
import { AuthContext } from '../context/AuthContext'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="http://jobit.online/">
        JobIt
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  enter: {
    margin: theme.spacing(0, 0, 2),
    backgroundColor: theme.palette.secondary.main,
  },
  label: {
    marginBottom: theme.spacing(3),
  },
  linkButton: {
    color: '#0277bd',
    fontSize: '0.875rem',
    fontFamily: 'Exo 2',
    fontWeight: 400,
    lineHeight: 1.43,
    '&:hover': {
      cursor: 'pointer',
      textDecoration: 'underline',
    },
  },
  linkContainer: {
    justifyContent: 'space-between',
  },
}))

export default function AuthPage() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const classes = useStyles()
  const [form, setForm] = useState({
      login: '',
      email: '',
      password: '',
    }),
    [isRegistration, setIsRegistration] = useState(false)

  const [errorMessage, setError] = useState()
  useEffect(() => {
    setError(error)
  }, [error])

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      setIsRegistration(false)
      setError(data.message)
    } catch (error) {}
  }
  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      auth.login(data.token, data.userId, data.userLogin)
      history.push(`/`)
    } catch (error) {}
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOpenOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Войти
        </Typography>
        <form className={classes.form} noValidate>
          {isRegistration ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="login"
              label="Login"
              name="login"
              autoComplete="login"
              autoFocus
              onChange={changeHandler}
            />
          ) : null}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={changeHandler}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={changeHandler}
          />
          <FormControlLabel
            className={classes.label}
            control={<Checkbox value="remember" color="primary" />}
            label="Запомнить меня"
          />
          {isRegistration ? (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={registerHandler}
              disabled={loading}
            >
              Зарегестрироваться
            </Button>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.enter}
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </Button>
          )}

          <Grid container className={classes.linkContainer}>
            <Link href="#" variant="body2">
              Забыли пароль?
            </Link>

            {isRegistration ? (
              <span className={classes.linkButton} onClick={() => setIsRegistration(false)}>
                Войти
              </span>
            ) : (
              <span className={classes.linkButton} onClick={() => setIsRegistration(true)}>
                Регистрация
              </span>
            )}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      <Snackbar
        message={errorMessage}
        autoHideDuration={4000}
        open={!!errorMessage}
        onClose={() => {
          clearError()
        }}
      />
    </Container>
  )
}
