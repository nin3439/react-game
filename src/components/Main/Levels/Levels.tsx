import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AllLevels from './AllLevels';
import Level from './Level';

function Levels() {
  return (
    <div>
      <h1>Levels</h1>
      <Switch>
        <Route exact path="/level" component={AllLevels} />
        <Route path="/level/:number" component={Level} />
      </Switch>
    </div>
  );
}
export default Levels;
