import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

export const NewReviewRating = () => {
  const [teamLeadRating, setTeamLeadRating] = useState(null);
  const [teamRating, setTeamRating] = useState(null);
  const [workplaceRating, setWorkplaceRating] = useState(null);
  const [tasksRating, setTasksRating] = useState(null);
  const [trainingRating, setTrainingRating] = useState(null);

  return (
    <>
    <Grid item xs={12} sm={3}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Тимлид</Typography>
        <Rating
          name="teamlead-10"
          max={10}
          value={teamLeadRating}
          onChange={(event, newValue) => {
            setTeamLeadRating(newValue);
          }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Обучение/Наставник</Typography>
        <Rating
          name="training-10"
          max={10}
          value={trainingRating}
          onChange={(event, newValue) => {
            setTrainingRating(newValue);
          }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Команда</Typography>
        <Rating
          name="team-10"
          max={10}
          value={teamRating}
          onChange={(event, newValue) => {
            setTeamRating(newValue);
          }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Рабочее место/Оборудование</Typography>
        <Rating
          name="workplace-10"
          max={10}
          value={workplaceRating}
          onChange={(event, newValue) => {
            setWorkplaceRating(newValue);
          }}
        />
      </Box>
    </Grid>
    <Grid item xs={12} sm={3}>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend">Разнообразие задач</Typography>
        <Rating
          name="task-10"
          max={10}
          value={tasksRating}
          onChange={(event, newValue) => {
            setTasksRating(newValue);
          }}
        />
      </Box>
    </Grid>
    </>
  );
};
