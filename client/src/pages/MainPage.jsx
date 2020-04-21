import React from 'react'
import { ReviewList } from './Review/components/ReviewList'
import { CompaniesList } from './Company/components/CompaniesList'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles'

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
      <ReviewList />

      <div className={classes.headerWrapper}>
        <Link component={RouterLink} to="/company" className={classes.header}>
          Последние компании
        </Link>
      </div>
      <CompaniesList />
    </>
  )
}
