import React from 'react';
import Levels from './Levels/Levels';
import { Link } from 'react-router-dom';
import { Typography, Button } from '@material-ui/core';
import classes from './styles/Main.module.scss';
import Rules from './Rules/Rules';

import { Switch, Route } from 'react-router-dom';
function Main() {
  const Home = () => (
    <div className={classes.main}>
      <Typography variant="h2" component="h2">
        Слова из Слова
      </Typography>
      <Button variant="outlined" color="primary">
        <Link className={classes.link} to="/level">
          Играть
        </Link>
      </Button>
      <Rules />
    </div>
  );
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/level" component={Levels} />
      </Switch>
    </div>
  );
}
export default Main;
