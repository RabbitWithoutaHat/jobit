import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 20,
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

export default function ReviewList() {
  const classes = useStyles()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [list, setList] = useState(null)

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
      <Grid container spacing={4}>
        {!loading && list && (
          <>
            {list.map(review => (
              <Grid item key={review._id} xs={12} sm={6} md={6}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {review.name ? review.name : 'Компания'}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      {review.position ? review.position : ''}
                    </Typography>
                    <Typography variant="body2" component="p">
                      {review.review ? review.review : ''}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Подробнее</Button>
                    <Button size="small">Редактировать</Button>
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
