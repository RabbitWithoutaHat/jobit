import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'

const useStyles = makeStyles(theme => ({
  checkboxBox: { width: 300, margin: '10px 0', textAlign: 'center' },
  checkboxGroup: { display: 'flex', justifyContent: 'center' },
}))

export const NewReviewCheckbox = ({ form, setForm, edit }) => {
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
              edit ? (
                <Checkbox
                  checked={!!form.online}
                  onChange={changeHandler}
                  name="online"
                />
              ) : (
                <Checkbox checked={!!form.online} name="online" />
              )
            }
            label="Онлайн"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.offline}
                  onChange={changeHandler}
                  name="offline"
                  color="primary"
                />
              ) : (
                <Checkbox
                  checked={!!form.offline}
                  name="offline"
                  color="primary"
                />
              )
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
              edit ? (
                <Checkbox
                  checked={!!form.product}
                  onChange={changeHandler}
                  name="product"
                />
              ) : (
                <Checkbox checked={!!form.product} name="product" />
              )
            }
            label="Продуктовая"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.outsourcing}
                  onChange={changeHandler}
                  name="outsourcing"
                  color="primary"
                />
              ) : (
                <Checkbox
                  checked={!!form.outsourcing}
                  name="outsourcing"
                  color="primary"
                />
              )
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
              edit ? (
                <Checkbox
                  checked={!!form.remote}
                  onChange={changeHandler}
                  name="remote"
                />
              ) : (
                <Checkbox checked={!!form.remote} name="remote" />
              )
            }
            label="Удаленная"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.office}
                  onChange={changeHandler}
                  name="office"
                  color="primary"
                />
              ) : (
                <Checkbox
                  checked={!!form.office}
                  name="office"
                  color="primary"
                />
              )
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
              edit ? (
                <Checkbox
                  checked={!!form.english}
                  onChange={changeHandler}
                  name="english"
                />
              ) : (
                <Checkbox checked={!!form.english} name="english" />
              )
            }
            label="Английский"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.lunch}
                  onChange={changeHandler}
                  name="lunch"
                  color="primary"
                />
              ) : (
                <Checkbox checked={!!form.lunch} name="lunch" color="primary" />
              )
            }
            label="Обеды"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.transit}
                  onChange={changeHandler}
                  name="transit"
                />
              ) : (
                <Checkbox checked={!!form.transit} name="transit" />
              )
            }
            label="Проезд"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.calls}
                  onChange={changeHandler}
                  name="calls"
                  color="primary"
                />
              ) : (
                <Checkbox checked={!!form.calls} name="calls" color="primary" />
              )
            }
            label="Связь"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.premium}
                  onChange={changeHandler}
                  name="premium"
                />
              ) : (
                <Checkbox checked={!!form.premium} name="premium" />
              )
            }
            label="Премия"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.sport}
                  onChange={changeHandler}
                  name="sport"
                  color="primary"
                />
              ) : (
                <Checkbox checked={!!form.sport} name="sport" color="primary" />
              )
            }
            label="Спорт"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.dms}
                  onChange={changeHandler}
                  name="dms"
                />
              ) : (
                <Checkbox checked={!!form.dms} name="dms" />
              )
            }
            label="ДМС"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.schedule}
                  onChange={changeHandler}
                  name="schedule"
                  color="primary"
                />
              ) : (
                <Checkbox
                  checked={!!form.schedule}
                  name="schedule"
                  color="primary"
                />
              )
            }
            label="Гибкий график"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.training}
                  onChange={changeHandler}
                  name="training"
                />
              ) : (
                <Checkbox checked={!!form.training} name="training" />
              )
            }
            label="Тренинги"
          />
          <FormControlLabel
            control={
              edit ? (
                <Checkbox
                  checked={!!form.relocation}
                  onChange={changeHandler}
                  name="relocation"
                  color="primary"
                />
              ) : (
                <Checkbox
                  checked={!!form.relocation}
                  name="relocation"
                  color="primary"
                />
              )
            }
            label="Релокация"
          />
        </FormGroup>
      </Box>
    </>
  )
}
