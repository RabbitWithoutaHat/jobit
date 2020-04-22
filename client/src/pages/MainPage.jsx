import React from 'react'
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles, Link } from '@material-ui/core'
import { ReviewList } from './Review/components/ReviewList'
import { CompaniesList } from './Company/components/CompaniesList'

const useStyles = makeStyles({
  headerWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
  },
})

export const MainPage = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.headerWrapper}>
        <Link component={RouterLink} to="/reviews" className={classes.header}>
          Последние отзывы
        </Link>
      </div>
      <ReviewList isMainPage={true} />

      <div className={classes.headerWrapper}>
        <Link component={RouterLink} to="/companies" className={classes.header}>
          Последние компании
        </Link>
      </div>
      <CompaniesList isMainPage={true} />
    </>
  )
}
