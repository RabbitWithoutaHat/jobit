import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';

export default function Loader() {
  return (
    <Grid
      container spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}>
      <Grid item xs={12}>
        <CircularProgress size="100px" color="primary" />
      </Grid>
    </Grid>
  );
}
