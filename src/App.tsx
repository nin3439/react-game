import React from 'react';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.app}>
      <Main />
      <Footer />
    </div>
  );
}

export default App;
