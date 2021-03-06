import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Typography,
  Button,
  Grid,
  Switch,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
} from '@material-ui/core';
import Rules from '../Rules';
import { useSound } from '../../../context/SoundContext';
import { playSound } from '../../../utils/utils';
import { useHotkeys } from 'react-hotkeys-hook';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: calc(100vh - 135px);
  row-gap: 25px;
  @media (max-width: 550px) {
    row-gap: 10px;
  }
`;

const StyledTypography = styled(Typography)`
  font-size: 106px;
  @media (max-width: 1260px) {
    font-size: 86px;
  }
  @media (max-width: 1000px) {
    font-size: 76px;
  }
  @media (max-width: 800px) {
    font-size: 66px;
  }
  @media (max-width: 550px) {
    font-size: 56px;
    text-align: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3f51b5;
`;

interface IHomeProps {
  isThemeDark: boolean;
  setIsThemeDark: (isThemeLight: boolean) => void;
}

export const Home: React.FC<IHomeProps> = ({ isThemeDark, setIsThemeDark }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sound = useSound();

  const handleClickOpen = () => {
    setIsModalOpen(true);
  };
  const handleClose = () => {
    setIsModalOpen(false);
  };

  const changeTheme = () => {
    setIsThemeDark(!isThemeDark);
  };

  useHotkeys('alt+t', () => changeTheme(), {}, [isThemeDark]);
  return (
    <Grid>
      <Grid style={{ margin: '10px 25px' }}>
        <Tooltip title="Сменить тему">
          <Switch
            checked={isThemeDark}
            onChange={changeTheme}
            color="primary"
          />
        </Tooltip>
      </Grid>
      <StyledGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <StyledTypography color="textPrimary" variant="h1">
          Слова из Слова
        </StyledTypography>
        <StyledLink
          to="/level"
          onClick={() => {
            playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
          }}
        >
          <Button variant="outlined" color="primary">
            {localStorage.key(2) ? 'Продолжить' : 'Играть'}
          </Button>
        </StyledLink>
        {localStorage.key(2) ? (
          <Box>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                handleClickOpen();
                playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
              }}
            >
              Новая игра
            </Button>

            <Dialog
              onClose={handleClose}
              aria-labelledby="rules"
              open={isModalOpen}
            >
              <DialogContent dividers>
                <Typography gutterBottom>
                  Все найденные слова будут стерты.
                </Typography>
                <Typography gutterBottom>Вы уверены?</Typography>
              </DialogContent>
              <DialogActions>
                <Button
                  autoFocus
                  onClick={() => {
                    playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
                    handleClose();
                  }}
                  color="primary"
                >
                  Нет
                </Button>
                <StyledLink
                  to="/level"
                  onClick={() => {
                    playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
                    localStorage.clear();
                  }}
                >
                  <Button onClick={handleClose} color="primary">
                    Да
                  </Button>
                </StyledLink>
              </DialogActions>
            </Dialog>
          </Box>
        ) : (
          ''
        )}
        <Rules />
      </StyledGrid>
    </Grid>
  );
};
