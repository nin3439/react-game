import React from 'react';
import { Main } from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledBox = styled(Box)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#ffb74d',
    },
    secondary: {
      main: '#11cb5f',
    },
    text: {
      primary: '#455a64',
    },
    type: 'light',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StyledBox>
        <Main />
        <Footer />
      </StyledBox>
    </ThemeProvider>
  );
}

export default App;
