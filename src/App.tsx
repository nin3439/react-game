import React, { useEffect, useState } from 'react';
import { Main } from './components/Main/Main';
import Footer from './components/Footer/Footer';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Box } from '@material-ui/core';
import { SoundProvider } from './context/SoundContext';
import styled from 'styled-components';
import { GameDifficultyProvider } from './context/GameDifficultyContext';

const StyledBox = styled(Box)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const App: React.FC = () => {
  const [isThemeDark, setIsThemeDark] = useState(false);
  const [volumeMusic, setVolumeMusic] = useState<number>(30);
  const [isMusicOn, setIsMusicOn] = useState<boolean>(false);
  const [music, setMusic] = useState(
    new Audio(
      `https://zvukipro.com/uploads/files/2019-05/1559046191_2b52b40e2a3d9f6.mp3`
    )
  );

  useEffect(() => {
    if (isMusicOn) {
      music.play();
    } else {
      music.pause();
    }
  }, [isMusicOn]);

  useEffect(() => {
    const volume = volumeMusic / 100;
    music.volume = volume;
    music.loop = true;
  }, [volumeMusic, music]);

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#ffb74d',
      },
      secondary: {
        main: '#11cb5f',
      },
      text: {
        primary: isThemeDark ? '#fafafa' : '#455a64',
      },
      type: isThemeDark ? 'dark' : 'light',
    },
  });

  return (
    <SoundProvider>
      <GameDifficultyProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <StyledBox>
            <Main isThemeDark={isThemeDark} setIsThemeDark={setIsThemeDark} />
            <Footer
              volumeMusic={volumeMusic}
              setVolumeMusic={setVolumeMusic}
              isMusicOn={isMusicOn}
              setIsMusicOn={setIsMusicOn}
            />
          </StyledBox>
        </ThemeProvider>
      </GameDifficultyProvider>
    </SoundProvider>
  );
};

export default App;
