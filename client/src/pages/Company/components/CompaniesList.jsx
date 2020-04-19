import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Loader from '../../../common/Loader'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { RatingIndicator } from '../../Review/components/RatingIndicator'
import { useHistory } from 'react-router-dom'


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
    height: 70,
  },
}))

export const CompaniesList = () => {
  const classes = useStyles()
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const history = useHistory()
  const [list, setList] = useState(null)

  const onClickCompanyButton = id => {
    history.push(`/company/${id}`)
  }

  const getList = useCallback(async () => {
    try {
      const fetched = await request(`/api/company/last`, 'GET', null, {
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
                      <Typography className={classes.textItem}>
                        {company.description ? company.description : ''}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button color="primary" onClick={onClickCompanyButton.bind(null, company._id)}>
                        Отзывов: {company.reviews.length}
                      </Button>
                    </CardActions>
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
    </>
  )
}
