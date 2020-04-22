import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles, Typography, Grid, Card, CardContent, Button, Container, Divider } from '@material-ui/core'
import { useHttp } from '../../../hooks/http.hook'
import useInfiniteScroll from '../../../hooks/scroll.hook'
import { RatingIndicator } from '../../Review/components/RatingIndicator'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../common/Loader'

const useStyles = makeStyles(theme => ({
  marginContainer: {
    display: 'flex',
    padding: 30,
  },
  root: {
    display: 'flex',
    minWidth: 275,
    height: 230,
    justifyContent: 'space-between',
    padding: '15px 20px',
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
  cardContent: {
    flexGrow: 1,
    padding: 5,
  },
  textItem: {
    whiteSpace: 'normal',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 100,
    marginTop: 10,
  },
  '.MuiCardActions-root': {
    paddingLeft: 0,
  },
  button: {
    paddingBottom: 10,
  },
}))

export const CompaniesList = ({ isMainPage }) => {
  const classes = useStyles()
  const history = useHistory()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [list, setList] = useState([])
  const [skipCounter, setSkipCounter] = useState(0)
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems, isMainPage)

  const onClickCompanyButton = id => {
    history.push(`/company/${id}`)
  }

  const getList = useCallback(async () => {
    const path = isMainPage ? `/api/company/last` : `/api/company/all?skip=${skipCounter}`
    try {
      const fetched = await request(path, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setSkipCounter(10)
      setList(fetched)
    } catch (e) {}
  }, [token, request, skipCounter])

  function fetchMoreListItems() {
    setTimeout(async () => {
      try {
        const fetched = await request(
          `/api/company/all?skip=${skipCounter}`,
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
    }, 2000)
  }

  useEffect(() => {
    getList()
  }, [])

  if (loading) {
    return <Loader />
  }
  return (
    <div>
      {!loading && list && (
        <Container className={classes.marginContainer} container spacing={3}>
          <Grid container spacing={4}>
            {list.map(company => (
              <Grid item key={company._id} xs={12} sm={12} md={6}>
                <Card className={classes.root}>
                  <div className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2">
                        {company.name ? company.name : ''}
                      </Typography>
                      <Typography className={classes.pos} color="textSecondary">
                        {company.address ? company.address : ''}
                      </Typography>
                      <Divider className={classes.divider} />
                      <Typography className={classes.textItem}>
                        {company.description ? company.description : ''}
                      </Typography>
                    </CardContent>
                    <div className={classes.button}>
                      <Button color="primary" onClick={onClickCompanyButton.bind(null, company._id)}>
                        Отзывов: {company.reviews.length}
                      </Button>
                    </div>
                  </div>
                  <div className={classes.cover}>
                    <RatingIndicator />
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  )
}
