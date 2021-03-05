import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllLevels from './AllLevels/AllLevels';
import { levelsNumber } from '../../../constants/levelsNumber';
import Level from './Level/Level';
import { useStateWithLocalStorage } from '../../../utils/utils';
import { Box } from '@material-ui/core';

export const Levels: React.FC = () => {
  const [levels, setLevels] = useStateWithLocalStorage(
    'levelNumber',
    levelsNumber
  );

  return (
    <Box style={{ height: 'calc(100vh-75px)' }}>
      <Switch>
        <Route
          exact
          path="/level"
          render={() => <AllLevels levels={levels} />}
        />

        <Route
          path="/level/:number"
          render={() => <Level levels={levels} setLevels={setLevels} />}
        />
      </Switch>
    </Box>
  );
};
