import React, { useState, useContext, useEffect, useCallback } from 'react'
import { NewReviewRating } from '../../components/NewReviewRating'
import { NewReviewCheckbox } from '../../components/NewReviewCheckbox'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { TextField } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { LocationSearchInput } from '../../components/LocationSearchInput'
import Snackbar from '@material-ui/core/Snackbar'

import Loader from '../../components/Loader'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  submit: {
    margin: theme.spacing(3, 0, 15),
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
    cursor: 'pointer',
    fontSize: '1rem',
    lineHeight: '1.5rem',
  },
}))

export const ReviewReadMorePage = props => {
  const reviewId = (props.match && props.match.params.id) || undefined
  const classes = useStyles()
  const { request, loading } = useHttp()
  const [form, setForm] = useState({})
  const { clearError, error, setError } = useHttp()
  const { token, userId } = useContext(AuthContext)

  const getReview = useCallback(async () => {
    if (reviewId) {
      try {
        const fetched = await request(`/api/review/${reviewId}`, 'GET', null, {
          Authorization: `Bearer ${token}`,
        })
        const { _id, ...rest } = fetched.company
        setForm({ ...fetched.review, companyId: _id, ...rest })
      } catch (e) {}
    }
  }, [token, request, reviewId])

  useEffect(() => {
    getReview()
  }, [getReview])

  if (loading) {
    return <Loader />
  }

  console.log('log->: form.companyName', form)
  return (
    <>
      <Grid className={classes.mainGrid} container spacing={3}>
        <Grid container spacing={2}>
          <Grid className={classes.titleGrid} item xs={12}>
            <Typography variant="h4"> Отзыв</Typography>
          </Grid>

          <Grid item xs={12} sm={6} className={classes.searchCompanyWrapper}>
            <Typography> Компания: {form.companyName || null} </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
          <Typography> {form.position || null} </Typography>
            
          </Grid>
          <Grid item xs={12}>
          <Typography> {form.description || null} </Typography>
          </Grid>

          <Grid className={classes.mapContainer} item xs={12}>
            <Typography> {form.address || null} </Typography>
          </Grid>

          <Grid item xs={12}>
          <Typography> {form.review || null} </Typography>
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
            />
          </Grid>
          <Grid className={classes.ratingCheckboxContainer} item xs={12}>
            <NewReviewRating form={form} setForm={setForm} />
            <NewReviewCheckbox form={form} setForm={setForm} />
          </Grid>
        </Grid>

        <Button
          // onClick={submitHandler}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Отправить
        </Button>
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
