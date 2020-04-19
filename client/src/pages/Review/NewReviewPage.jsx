import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { TextField, Typography, Button, Snackbar, makeStyles, Grid, Card, CardContent } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { NewReviewRating } from './components/NewReviewRating'
import { NewReviewCheckbox } from './components/NewReviewCheckbox'
import LocationInputMap from './components/LocationInputMap'
import Loader from '../../common/Loader'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  submit: {
    margin: theme.spacing(3, 0, 5),
  },
  mainGrid: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  titleGrid: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  mapContainer: {
    marginBottom: theme.spacing(3),
  },
  locationInput: {
    width: '100%',
  },
  ratingCheckboxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
}))

export const NewReviewPage = ({ edit }) => {
  const history = useHistory()
  const reviewId = useParams().id
  const classes = useStyles()
  const { request, loading } = useHttp()
  const [form, setForm] = useState({})
  const [companies, setCompanies] = useState([])
  const { clearError, error, setError } = useHttp()
  const { token, userId } = useContext(AuthContext)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const searchCompany = async event => {
    event.persist()
    setForm({ ...form, [event.target.name]: event.target.value })
    try {
      const data = await request(
        `/api/company/search/${event.target.value}`,
        'GET',
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        false,
      )

      setCompanies(data.companies)
    } catch (e) {
      setError(e.message)
    }
  }

  const submitHandler = async event => {
    event.preventDefault()
    const path = reviewId ? '/api/review/update' : '/api/review/new'
    const method = reviewId ? 'PUT' : 'POST'
    try {
      const data = await request(path, method, { ...form, userId }, { Authorization: `Bearer ${token}` })
      history.push(`/review/${reviewId || data.id}`)
    } catch (e) {
      setError(e.message)
    }
  }

  const onSelectCompany = event => {
    event.persist()
    console.log('log->: NewReviewPage -> companies', companies)
    const company = companies.find(company => company.name === event.target.value)
    if (company) {
      const { _id, ...rest } = company
      setForm({ ...form, companyId: _id, ...rest })
    }
  }

  const getReview = useCallback(async () => {
    if (reviewId) {
      try {
        const reviewInfo = await request(`/api/review/${reviewId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
        const companyInfo = await request(`/api/company/review/${reviewId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
        const { _id, ...rest } = companyInfo
        setForm({ ...reviewInfo, companyId: _id, ...rest })
      } catch (e) {}
    }
  }, [token, request, reviewId])

  useEffect(() => {
    getReview()
  }, [getReview])

  if (loading) {
    return <Loader />
  }
  console.log('FORM', form)

  return (
    <Card>
      <CardContent className={classes.card}>
        <Grid className={classes.mainGrid} container spacing={3}>
          <form className={classes.form}>
            <Grid container spacing={2}>
              <Grid className={classes.titleGrid} item xs={12}>
                <Typography variant="h4"> Добавить отзыв</Typography>
              </Grid>
              <Grid item xs={12} sm={6} className={classes.searchCompanyWrapper}>
                <Autocomplete
                  id="free-solo"
                  freeSolo
                  options={companies || []}
                  loading={loading}
                  value={form.companyName || ''}
                  getOptionLabel={option => (typeof option === 'string' ? option : option ? option.name : '')}
                  renderInput={params => (
                    <TextField
                      {...params}
                      name="name"
                      label="Название компании"
                      variant="outlined"
                      onChange={searchCompany}
                      onSelect={onSelectCompany}
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  value={form.position}
                  id="position"
                  label="Должность"
                  name="position"
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  label="Описание компании"
                  id="description"
                  value={form.description || ''}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid className={classes.mapContainer} item xs={12}>
                <LocationInputMap className={classes.locationInput} form={form} setForm={setForm} setError={setError} />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={7}
                  name="review"
                  label="Отзыв"
                  id="review"
                  value={form.review}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  multiline
                  rows={4}
                  name="questions"
                  label="Вопросы и задачи на собеседовании"
                  id="questions"
                  value={form.questions}
                  onChange={changeHandler}
                />
              </Grid>
              <Grid className={classes.ratingCheckboxContainer} item xs={12}>
                <NewReviewRating edit={edit} form={form} setForm={setForm} />
                <NewReviewCheckbox edit={edit} form={form} setForm={setForm} />
              </Grid>
            </Grid>

            <Button
              onClick={submitHandler}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Отправить
            </Button>
          </form>
          <Snackbar
            message={error}
            autoHideDuration={4000}
            open={!!error}
            onClose={() => {
              clearError()
            }}
          />
        </Grid>
      </CardContent>
    </Card>
  )
}
