import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, Card, CardContent, Typography, Button, Grid, Divider } from '@material-ui/core'
import { RatingIndicator } from '../components/RatingIndicator'
import {ListPlaceholder} from '../../../common/ListPlaceholder'
import { AuthContext } from '../../../context/AuthContext'
import { useHttp } from '../../../hooks/http.hook'
import useInfiniteScroll from '../../../hooks/scroll.hook'
import Loader from '../../../common/Loader'

const useStyles = makeStyles({
  marginContainer: {
    display: 'flex',
    padding: 30,
  },
  root: {
    display: 'flex',
    minWidth: 275,
    height: 250,
    justifyContent: 'space-between',
    padding: '15px 20px',
  },
  title: {
    fontSize: 14,
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    justifyContent: 'space-between',
    margin: '7px',
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
    marginTop: 10,
    maxHeight: 80,
  },
  button: {
    paddingBottom: 10,
  },
  padding: {
    padding: '5px',
  },
  date: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  userInfo: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
  '.MuiCardActions-root': {
    paddingLeft: 0,
  },
})

export function ReviewList({ isProfilePage, isCompanyPage, isMainPage, companyId }) {
  const classes = useStyles()
  const history = useHistory()
  const { token, userId } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [list, setList] = useState([])
  const [skipCounter, setSkipCounter] = useState(0)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems, isMainPage)

  const onClickEditReview = id => {
    history.push(`/review/edit/${id}`)
  }

  const onClickReadReview = id => {
    history.push(`/review/${id}`)
  }

  const getList = useCallback(async () => {
    const path = isProfilePage
      ? `/api/review/user/${userId}`
      : isCompanyPage
      ? `/api/review/company/${companyId}`
      : isMainPage
      ? '/api/review/last'
      : `/api/review/all?skip=${skipCounter}`
    try {
      const fetched = await request(path, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setList(fetched)
      setSkipCounter(10)
    } catch (e) {}
  }, [token, request, isProfilePage, userId, skipCounter])

  function fetchMoreListItems() {
    setTimeout(async () => {
      try {
        const fetched = await request(
          `/api/review/all?skip=${skipCounter}`,
          'GET',
          null,
          {
            Authorization: `Bearer ${token}`,
          },
          false,
        )
        setList([...list, ...fetched])
        setSkipCounter(skipCounter + 10)
      } catch (e) {}
      setIsFetching(false)
    }, 1000)
  }

  useEffect(() => {
    getList()
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <Grid className={classes.marginContainer} container spacing={3}>
      {!loading && list.length ? (
        <>
          {list.map(review => {
            const date = review.date ? new Date(review.date) : undefined
            return (
              <Grid item key={review._id} xs={12} sm={12} md={6}>
                <Card className={classes.root}>
                  <div className={classes.card}>
                    <CardContent className={classes.padding}>
                      <Typography variant="h5" component="h2">
                        {review.companyName ? review.companyName : 'Компания'}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {review.position ? review.position : ''}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Typography className={classes.textItem} variant="body2" component="p">
                        {review.review ? review.review : ''}
                      </Typography>
                      <div className={classes.userInfo}>
                        <Typography className={classes.date}>
                          {review.date ? date.toLocaleDateString() : 'Дата'}
                        </Typography>
                        <Typography className={classes.author}>
                          {review.author ? review.author : 'Пользователь'}
                        </Typography>
                      </div>
                    </CardContent>
                    <div className={classes.button}>
                      <Button color="primary" onClick={onClickReadReview.bind(null, review._id)}>
                        Подробнее
                      </Button>
                      {isProfilePage ? (
                        <Button color="primary" onClick={onClickEditReview.bind(null, review._id)}>
                          Редактировать
                        </Button>
                      ) : null}
                    </div>
                  </div>
                  <div className={classes.cover}>
                    <RatingIndicator commonRating={review.commonRating} />
                  </div>
                </Card>
              </Grid>
            )
          })}
        </>
      ) : (
        <ListPlaceholder />
      )}
    </Grid>
  )
}
