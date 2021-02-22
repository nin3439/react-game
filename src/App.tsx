import React from 'react';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { Box } from '@material-ui/core';
import { useStyles } from './AppMaterialStyles';

function App() {
  const classMaterial: Record<'root', string> = useStyles();
  return (
    <Box className={classMaterial.root}>
      <Main />
      <Footer />
    </Box>
  );
}

export default App;
