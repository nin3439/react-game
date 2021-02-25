import React from 'react';
import Main from './components/Main/Main';
import Footer from './components/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { orange, indigo } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    width: '100vw',
    backgroundImage:
      'linear-gradient(-225deg, #5d9fff 0%, #b8dcff 48%,#6bbbff 100%)',
    overflow: 'hidden',
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: orange,
  },
});

function App() {
  const classMaterial: Record<'root', string> = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <Box className={classMaterial.root}>
        <Main />
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
