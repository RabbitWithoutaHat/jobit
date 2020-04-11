import React, { useState, useContext, useEffect, useCallback } from 'react'
import { NewReviewRating } from './components/NewReviewRating'
import { NewReviewCheckbox } from './components/NewReviewCheckbox'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { TextField } from '@material-ui/core'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { LocationSearchInput } from './components/LocationSearchInput'
import Snackbar from '@material-ui/core/Snackbar'
import { useParams } from 'react-router-dom'

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
  ratingCheckboxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  map: {
    height: 400,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
  searchCompanyWrapper: { position: 'relative' },
  autocompleteDropdownContainer: {
    width: '98%',
    position: 'absolute',
    backgroundColor: 'white',
    fontSize: '1rem',
    height: 120,
    zIndex: 5,
    borderRadius: '5px',
    padding: '5px 10px',
  },
  autocompleteDropdownItem: {
    // padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}))

export const NewReviewPage = () => {
  const reviewId = useParams().id
  const classes = useStyles()
  const { request, loading } = useHttp()
  const [form, setForm] = useState({})
  const [companies, setCompanies] = useState()
  const [showCompanySearchDropdown, setShowCompanySearchDropdown] = useState(
    false,
  )
  const { clearError, error, setError } = useHttp()
  const { token, userId } = useContext(AuthContext)

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const searchCompany = async event => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setShowCompanySearchDropdown(true)
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
      console.log(data)

      setCompanies(data.companies)
    } catch (e) {
      setError(e.message)
    }
  }

  const submitHandler = async () => {
    const path = reviewId ? '/api/review/update' : '/api/review/new'
    const method = reviewId ? 'PUT' : 'POST'
    try {
      const data = await request(
        path,
        method,
        { ...form, userId },
        { Authorization: `Bearer ${token}` },
      )
      setForm({})
    } catch (e) {
      setError(e.message)
    }
  }

  const onSelectCompany = id => {
    const company = companies.find(company => company._id === id)
    console.log(company)
    setForm({ ...form, ...company })
    setShowCompanySearchDropdown(false)
  }

  const getReview = useCallback(async () => {
    if (reviewId) {
      try {
        const fetched = await request(`/api/review/${reviewId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
        const { _id, ...rest } = fetched.company
        setForm({ ...fetched.review, companyId: _id, ...rest })
        console.log('log->: getReview -> fetched.company', fetched)
      } catch (e) {}
    }
  }, [token, request, reviewId])

  useEffect(() => {
    getReview()
  }, [getReview])

  if (loading) {
    return <Loader />
  }
  console.log('log->: form', form)

  return (
    <>
      <Grid className={classes.mainGrid} container spacing={3}>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid className={classes.titleGrid} item xs={12}>
              <Typography variant="h4"> Добавить отзыв</Typography>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.searchCompanyWrapper}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                value={form.companyName}
                id="name"
                label="Название компании"
                autoFocus
                onChange={searchCompany}
              />
              {companies && companies.length && showCompanySearchDropdown ? (
                <>
                  <div className={classes.autocompleteDropdownContainer}>
                    {companies.map(company => {
                      return (
                        <div
                          className={classes.autocompleteDropdownItem}
                          onClick={onSelectCompany.bind(null, company._id)}
                        >
                          <span>{company.name}</span>
                        </div>
                      )
                    })}
                  </div>
                </>
              ) : null}
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
                value={form.description}
                onChange={changeHandler}
              />
            </Grid>
            <Grid className={classes.mapContainer} item xs={12}>
              <LocationSearchInput
                form={form}
                setForm={setForm}
                setError={setError}
              />
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
              <NewReviewRating form={form} setForm={setForm} />
              <NewReviewCheckbox form={form} setForm={setForm} />
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
    </>
  )
}
