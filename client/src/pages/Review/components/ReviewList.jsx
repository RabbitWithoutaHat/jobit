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
import { RatingIndicator } from '../components/RatingIndicator'

const useStyles = makeStyles({
  root: {
    display: 'flex',
    minWidth: 275,
    height: 200,
    justifyContent: 'space-between',
    padding: 15,
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
    width: '65%',
    justifyContent: 'space-between',
  },
  cover: {
    minWidth: '35%',
    display: 'flex',
    justifyContent: 'center',
  },
  textItem: {
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 60,
  },
})

export function ReviewList({ isMainPage }) {
  const classes = useStyles()
  const history = useHistory()
  const { token, userId } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [list, setList] = useState(null)

  const onClickEditReview = id => {
    history.push(`/review/edit/${id}`)
  }

  const onClickReadReview = id => {
    history.push(`/review/${id}`)
  }

  const getList = useCallback(async () => {
    const path = isMainPage ? '/api/review' : `/api/review/user/${userId}`
    try {
      const fetched = await request(path, 'GET', null, {
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
              <Grid item key={review._id} xs={12} sm={12} md={6}>
                <Card className={classes.root}>
                  <div className={classes.card}>
                    <CardContent>
                      <Typography variant="h5" component="h2">
                        {review.companyName ? review.companyName : 'Компания'}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {review.position ? review.position : ''}
                      </Typography>
                      <Typography
                        className={classes.textItem}
                        variant="body2"
                        component="p"
                      >
                        {review.review ? review.review : ''}
                      </Typography>
                    </CardContent>
                    <CardActions className={classes.button}>
                      <Button
                        size="small"
                        onClick={onClickReadReview.bind(null, review._id)}
                      >
                        Подробнее
                      </Button>
                      {isMainPage ? null : (
                        <Button
                          size="small"
                          onClick={onClickEditReview.bind(null, review._id)}
                        >
                          Редактировать
                        </Button>
                      )}
                    </CardActions>
                  </div>
                  <div className={classes.cover}> 
                  <RatingIndicator commonRating={review.commonRating} />

                  </div>
                </Card>
              </Grid>
            ))}
          </>
        )}
      </Grid>
    </>
  )
}
