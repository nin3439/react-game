import React from 'react';
import { Levels } from './Levels/Levels';
import { Home } from './Home/Home';
import { Switch, Route, HashRouter } from 'react-router-dom';

interface IMainProps {
  isThemeDark: boolean;
  setIsThemeDark: (isThemeLight: boolean) => void;
}

export const Main: React.FC<IMainProps> = ({ isThemeDark, setIsThemeDark }) => {
  return (
    <HashRouter>
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <Home isThemeDark={isThemeDark} setIsThemeDark={setIsThemeDark} />
          )}
        />
        <Route path="/level" component={Levels} />
      </Switch>
    </HashRouter>
  );
};
