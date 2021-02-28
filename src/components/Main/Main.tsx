import React from 'react';
import { Levels } from './Levels/Levels';
import { Home } from './Home/Home';
import { Switch, Route } from 'react-router-dom';

export const Main: React.FC = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Home />} />
        <Route path="/level" component={Levels} />
      </Switch>
    </>
  );
};
