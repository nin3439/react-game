import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllLevels from './AllLevels/AllLevels';
import Level from './Level/Level';
import { makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '93vh',
  },
}));

function Levels() {
  const classMaterial: Record<'root', string> = useStyles();
  return (
    <Box className={classMaterial.root}>
      <Switch>
        <Route exact path="/level" component={AllLevels} />
        <Route path="/level/:number" component={Level} />
      </Switch>
    </Box>
  );
}
export default Levels;
