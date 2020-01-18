import React, { useCallback, useContext, useEffect, useState } from 'react';
import { NewReviewRating } from '../components/NewReviewRating';
import { NewReviewCheckbox } from '../components/NewReviewCheckbox';
import { NewReviewMap } from '../components/NewReviewMap';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Loader from '../components/Loader';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    boxSizing: 'border-box',
  },
  submit: {
    margin: theme.spacing(3, 0, 15  ),
  },
  mainGrid: {
    justifyContent: 'center',
    marginTop: theme.spacing(4),
  },
  titleGrid: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  mapContainer: {
    height: 400,
    marginBottom: theme.spacing(3),
  },
  map: {
    height: 400,
    width: '100%',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: 'auto',
    backgroundColor: theme.palette.secondary.main,
  },
  avatarGrid: {
    marginTop: 40,
  },
}));

export const NewReviewPage = () => {
  const classes = useStyles();
  const { token, userId } = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [user, setUser] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(fetched);
    } catch (e) {}
  }, [token, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (loading) {
    return <Loader />;
  }
  console.log(user);

  return (
    <div className={classes.root}>
      <Grid className={classes.mainGrid} container spacing={3}>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid className={classes.titleGrid} item xs={12}>
              <Typography variant="h4"> Добавить отзыв</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Название компании"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField variant="outlined" required fullWidth id="position" label="Должность" name="position" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={7}
                name="review"
                label="Отзыв"
                id="review"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
                name="questions"
                label="Вопросы и задачи на собеседовании"
                id="questions"
              />
            </Grid>
            <NewReviewRating />
            <NewReviewCheckbox />
            <Grid className={classes.mapContainer} item xs={12}>
              <NewReviewMap className={classes.map} />
            </Grid>
          </Grid>

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Отправить
          </Button>
        </form>
      </Grid>
    </div>
  );
};
