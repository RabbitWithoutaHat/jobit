import React from 'react'
import { ReviewList } from './Review/components/ReviewList'
import { CompaniesList } from './Company/components/CompaniesList'
import { Link } from '@material-ui/core'
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
        <Link href="#" className={classes.header}>
          Последние отзывы
        </Link>
      </div>
      <ReviewList isMainPage={true} />

      <div className={classes.headerWrapper}>
        <Link href="#" className={classes.header}>
          Последние компании
        </Link>
      </div>
      <CompaniesList />
    </>
  )
}
