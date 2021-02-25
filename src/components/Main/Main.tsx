import React from 'react';
import Levels from './Levels/Levels';
import { Link } from 'react-router-dom';
import { Typography, Button, Container } from '@material-ui/core';
import Rules from './Rules';
import { Switch, Route } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main: {
    height: '93vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
}));

function Main() {
  const classMaterial: Record<'main' | 'link', string> = useStyles();
  const Home = () => (
    <Container className={classMaterial.main}>
      <Typography variant="h2" component="h2">
        Слова из Слова
      </Typography>
      <Link className={classMaterial.link} to="/level">
        <Button variant="outlined" color="primary">
          Играть
        </Button>
      </Link>
      <Rules />
    </Container>
  );
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/level" component={Levels} />
      </Switch>
    </>
  );
}
export default Main;
