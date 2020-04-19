import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  flexWrapper: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  singleChart: {
    width: '100%',
    justifyContent: ' space-around',
  },
  circularChart: {
    display: 'block',
    margin: '10px, auto',
    maxWidth: '80%',
    maxHeight: '250px',
  },
  circleBg: {
    fill: 'none',
    stroke: '#eee',
    strokeWidth: 3,
  },
  circle: {
    fill: 'none',
    strokeWidth: 2,
    strokeLinecap: 'round',
    animation: '$progress 1s ease-out forwards',
  },
  '@keyframes progress': {
    '0%': {
      strokeDasharray: '0, 100',
    },
  },
  circularChartBlue: {
    stroke: '#3c9ee5',
    fill: 'none',
    strokeLinecap: 'round',
  },
  percentage: {
    fill: '#666',
    fontSize: '7px',
    textAnchor: 'middle',
    fontWeight: 200,
  },
})

export const RatingIndicator = ({commonRating}) => {
  const classes = useStyles()

  return (
    <div className={classes.flexWrapper}>
      <div className={classes.singleChart}>
        <svg viewBox="0 0 36 36" className={classes.circularChartBlue}>
          <path
            className={classes.circleBg}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className={classes.circle}
            strokeDasharray={`${commonRating}0, 100`}
            d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className={classes.percentage}>
            {commonRating}
          </text>
        </svg>
      </div>
    </div>
  )
}
