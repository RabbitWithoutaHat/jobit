import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { NewReviewRating } from './components/NewReviewRating'
import { NewReviewCheckbox } from './components/NewReviewCheckbox'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Snackbar from '@material-ui/core/Snackbar'
import Divider from '@material-ui/core/Divider'

import Loader from '../../common/Loader'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  mainGrid: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  titleGrid: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  ratingCheckboxContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  divider: {
    maxWidth: 200,
  },
  textItemTitle: {
    color: '#6f6f6f',
  },
  textItem: {
    marginBottom: 15,
  },
}))

export const ReviewReadMorePage = props => {
  const reviewId = useParams().id
  const classes = useStyles()
  const { request, loading } = useHttp()
  const [form, setForm] = useState({})
  const { clearError, error } = useHttp()
  const { token } = useContext(AuthContext)

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
  return (
    <>
      <Grid className={classes.mainGrid} container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Компания:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h4" className={classes.textItem}>
              {form.companyName || null}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Должность:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h4" className={classes.textItem}>
              {form.position || null}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Описание компании:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.textItem}>
              {form.description || null}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Адрес:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.textItem}>
              {form.address || null}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Отзыв:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.textItem}>
              {form.review || null}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" className={classes.textItemTitle}>
              Вопросы и задачи на собеседовании:
            </Typography>
            <Divider className={classes.divider} />
            <Typography variant="h6" className={classes.textItem}>
              {form.questions || null}
            </Typography>
          </Grid>

          <Grid className={classes.ratingCheckboxContainer} item xs={12}>
            <NewReviewRating form={form} setForm={setForm} />
            <NewReviewCheckbox form={form} setForm={setForm} />
          </Grid>
        </Grid>
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
