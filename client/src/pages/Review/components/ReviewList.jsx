import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../common/Loader'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
  },
  marginContainer: {
    marginTop: 25,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
})

export function ReviewList() {
  const classes = useStyles()
  const history = useHistory()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [list, setList] = useState(null)

  const onClickEditReview = id => {
    history.push(`/review/edit/${id}`)
  }

  const onClickReadReview = id => {
    history.push(`/review/${id}`)
  }

  const getList = useCallback(async () => {
    try {
      const fetched = await request(`/api/review`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setList(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getList()
  }, [getList])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <Grid className={classes.marginContainer} container spacing={4}>
        {!loading && list && (
          <>
            {list.map(review => (
              <Grid item key={review._id} xs={12} sm={6} md={6}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {review.companyName ? review.companyName : 'Компания'}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {review.position ? review.position : ''}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {review.review ? review.review : ''}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={onClickReadReview.bind(null, review._id)}
                    >
                      Подробнее
                    </Button>
                    <Button
                      size="small"
                      onClick={onClickEditReview.bind(null, review._id)}
                    >
                      Редактировать
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  )
}
