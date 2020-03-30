import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  checkboxBox: { width: 300, margin: '10px 0', textAlign: 'center' },
  checkboxGroup: { display: 'flex', justifyContent: 'center'}
}))

export const NewReviewCheckbox = ({ form, setForm }) => {
  const classes = useStyles()

  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <Box item md={6} lg={3} className={classes.checkboxBox}>
        <Typography component="legend">Формат собеседовния:</Typography>
        <FormGroup row className={classes.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.online}
                onChange={changeHandler}
                name="online"
              />
            }
            label="Онлайн"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.offline}
                onChange={changeHandler}
                name="offline"
                color="primary"
              />
            }
            label="Офлайн"
          />
        </FormGroup>
      </Box>
      <Box item md={6} lg={3} className={classes.checkboxBox}>
        <Typography component="legend">Тип компании:</Typography>
        <FormGroup row className={classes.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.product}
                onChange={changeHandler}
                name="product"
              />
            }
            label="Продуктовая"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.outsourcing}
                onChange={changeHandler}
                name="outsourcing"
                color="primary"
              />
            }
            label="Аутсорсинг"
          />
        </FormGroup>
      </Box>
      <Box item md={6} lg={3} className={classes.checkboxBox}>
        <Typography component="legend">График работы:</Typography>
        <FormGroup row className={classes.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.remote}
                onChange={changeHandler}
                name="remote"
              />
            }
            label="Удаленная"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.office}
                onChange={changeHandler}
                name="office"
                color="primary"
              />
            }
            label="В офисе"
          />
        </FormGroup>
      </Box>
      <Box xs={12} sm={12}>
        <Typography component="legend">Бонусы:</Typography>
        <FormGroup row className={classes.checkboxGroup}>
          <FormControlLabel
            control={
              <Checkbox
                checked={form.english}
                onChange={changeHandler}
                name="english"
              />
            }
            label="Английский"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.lunch}
                onChange={changeHandler}
                name="lunch"
                color="primary"
              />
            }
            label="Обеды"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.transit}
                onChange={changeHandler}
                name="transit"
              />
            }
            label="Проезд"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.calls}
                onChange={changeHandler}
                name="calls"
                color="primary"
              />
            }
            label="Связь"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.premium}
                onChange={changeHandler}
                name="premium"
              />
            }
            label="Премия"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.sport}
                onChange={changeHandler}
                name="sport"
                color="primary"
              />
            }
            label="Спорт"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.dms}
                onChange={changeHandler}
                name="dms"
              />
            }
            label="ДМС"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.schedule}
                onChange={changeHandler}
                name="schedule"
                color="primary"
              />
            }
            label="Гибкий график"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.training}
                onChange={changeHandler}
                name="training"
              />
            }
            label="Тренинги"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={form.relocation}
                onChange={changeHandler}
                name="relocation"
                color="primary"
              />
            }
            label="Релокация"
          />
        </FormGroup>
      </Box>
    </>
  )
}
