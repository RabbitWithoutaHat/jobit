import React from 'react'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { Typography } from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  ratingItem: { width: 300, margin: '10px 0', textAlign: 'center' },
}))

export const NewReviewRating = ({ form, setForm }) => {
  const classes = useStyles()

  const changeHandler = event => {
    if (form[event.target.name] === event.target.value) {
      setForm({ ...form, [event.target.name]: 0 })
    } else {
      setForm({ ...form, [event.target.name]: event.target.value })
    }
  }

  return (
    <>
      <Grid item>
        <Box md={6} lg={3} className={classes.ratingItem}>
          <Typography component="legend">Тимлид</Typography>
          <Rating
            name="teamleadRating"
            value={form.teamleadRating}
            max={10}
            onChange={changeHandler}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box md={6} lg={3} className={classes.ratingItem}>
          <Typography component="legend">Обучение/Наставник</Typography>
          <Rating
            name="trainingRating"
            value={form.trainingRating}
            max={10}
            onChange={changeHandler}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box md={6} lg={3} className={classes.ratingItem}>
          <Typography component="legend">Команда</Typography>
          <Rating
            name="teamRating"
            value={form.teamRating}
            max={10}
            onChange={changeHandler}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box md={6} lg={3} className={classes.ratingItem}>
          <Typography component="legend">Рабочее место/Оборудование</Typography>
          <Rating
            name="workplaceRating"
            value={form.workplaceRating}
            max={10}
            onChange={changeHandler}
          />
        </Box>
      </Grid>
      <Grid item>
        <Box md={6} lg={3} className={classes.ratingItem}>
          <Typography component="legend">Разнообразие задач</Typography>
          <Rating
            name="taskRating"
            value={form.taskRating}
            max={10}
            onChange={changeHandler}
          />
        </Box>
      </Grid>
    </>
  )
}
