import React, { useCallback, useContext, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/AuthContext'
import Loader from '../../common/Loader'
import { RatingIndicator } from '../Review/components/RatingIndicator'
import {ReviewList} from '../Review/components/ReviewList'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    fontSize: 17,
    justifyContent: 'center',
    marginBottom: 30,
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'block',
      height: 230,
      zIndex: -5,
      marginTop: -40,
      background:
        'linear-gradient(160deg, rgba(63,81,181,1) 0%, rgba(63,95,181,1) 35%, rgba(0,212,255,0.8601190476190477) 100%)',
      width: '100vw',
      left: 0,
    },
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '65%',
    margin: '7px',
  },
  profileNicName: {
    display: 'flex',
    alignItems: 'center',
  },
  form: {
    width: '100%',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '0 12px',
  },
  descriptionBox: {
    maxWidth: '100%',
  },
  textItem: {
    maxWidth: '100%',
    height: 28,
    whiteSpace: 'normal',
    overflow: 'hidden',
    paddingTop: 10,
    color: 'white',
  },
  textCompanyDescription: {
    maxWidth: '100%',
    height: 70,
    whiteSpace: 'normal',
    overflow: 'hidden',
    paddingTop: 10,
    color: 'white',
  },
  divider: {
    backgroundColor: 'white',
  },
  companyName: {
    color: 'white',
  },
}))

export const CompanyPage = () => {
  const classes = useStyles()
  const companyId = useParams().id
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [company, setCompany] = useState(null)

  const getCompany = useCallback(async () => {
    try {
      const fetched = await request(`/api/company/${companyId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setCompany(fetched)
    } catch (e) {}
  }, [token, request, companyId])

  useEffect(() => {
    getCompany()
  }, [getCompany])

  if (loading) {
    return <Loader />
  }

  return (
    <Grid container>
      {!loading && company && (
        <Grid container className={classes.root}>
          <Grid item xs={12} sm={3} lg={2} className={classes.avatarGrid}>
            <div className={classes.cover}>
              <RatingIndicator isCompanyPage={true} commonRating={7.4} />
            </div>
          </Grid>
          <div className={classes.card}>
            <Grid className={classes.column} item xs={12} sm={12} lg={12}>
              <Typography className={classes.textItem} variant="h5" component="h1">
                {company.name || null}
              </Typography>
              <Typography className={classes.textItem}> {company.address || null} </Typography>
              <Divider className={classes.divider} />
              <Grid className={classes.descriptionBox}>
                <Typography className={classes.textCompanyDescription} variant="body2" component="p">
                  {company.description || null}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Grid>
      )}

      <ReviewList isCompanyPage={true} companyId={companyId} />
    </Grid>
  )
}
