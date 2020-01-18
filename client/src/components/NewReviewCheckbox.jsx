import React, {useState} from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  checkboxRow: {

  },
}));

export const NewReviewCheckbox = () => {
  const classes = useStyles();
  const [state, setState] = useState({
    online: false,
    offline: false,
    product: false,
    outsourcing: false,
    remote: false,
    office: false,
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <>
    <Grid item xs={12} sm={3}>
      <Typography component="legend">Формат собеседовния:</Typography>
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange('online')} value="online" />}
        label="Онлайн"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.checkedB} onChange={handleChange('offline')} value="offline" color="primary" />
        }
        label="Офлайн"
      />
    </FormGroup>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Typography component="legend">Тип компании:</Typography>
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.product} onChange={handleChange('product')} value="product" />}
        label="Продуктовая"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.outsourcing} onChange={handleChange('outsourcing')} value="outsourcing" color="primary" />
        }
        label="Аутсорсинг"
      />
    </FormGroup>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Typography component="legend">График работы:</Typography>
    <FormGroup row>
      <FormControlLabel
        control={<Checkbox checked={state.remote} onChange={handleChange('remote')} value="remote" />}
        label="Удаленная"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.office} onChange={handleChange('office')} value="office" color="primary" />
        }
        label="В офисе"
      />
    </FormGroup>
    </Grid>
    <Grid item xs={12} sm={12}>
      <Typography component="legend">Бонусы:</Typography>
    <FormGroup className={classes.checkboxRow} row>
      <FormControlLabel
        control={<Checkbox checked={state.english} onChange={handleChange('english')} value="english" />}
        label="Английский"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.lunch} onChange={handleChange('lunch')} value="lunch" color="primary" />
        }
        label="Обеды"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.transit} onChange={handleChange('transit')} value="transit"  />
        }
        label="Проезд"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.calls} onChange={handleChange('calls')} value="calls" color="primary" />
        }
        label="Связь"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.premium} onChange={handleChange('premium')} value="premium"  />
        }
        label="Премия"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.sport} onChange={handleChange('sport')} value="sport" color="primary" />
        }
        label="Спорт"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.dms} onChange={handleChange('dms')} value="dms"  />
        }
        label="ДМС"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.schedule} onChange={handleChange('schedule')} value="schedule" color="primary" />
        }
        label="Гибкий график"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.training} onChange={handleChange('training')} value="training"  />
        }
        label="Тренинги"
      />
      <FormControlLabel
        control={
          <Checkbox checked={state.relocation} onChange={handleChange('relocation')} value="relocation" color="primary" />
        }
        label="Релокация"
      />
    </FormGroup>
    </Grid>
    </>
  );
};
