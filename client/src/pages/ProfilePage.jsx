import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { ProfileData} from '../components/ProfileData'
import Loader from '../components/Loader'


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
    backgroundColor: theme.palette.secondary.main
  },
  avatarGrid: {
    marginTop: 40
  }
}));

export const ProfilePage = () => {
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
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.avatarGrid}>
          <Avatar className={classes.avatar}  alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <ProfileData/>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
      </Grid>
    </div>
  );
}
