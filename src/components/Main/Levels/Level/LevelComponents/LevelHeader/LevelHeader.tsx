import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  Tooltip,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Menu, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons/';
import {
  getNumberOfRemainingWords,
  playSound,
} from '../../../../../../utils/utils';
import { Statistics } from './Statistics';
import { useSound } from '../../../../../../context/SoundContext';
import styled from 'styled-components';
import Dollar from '../../../../../../assets/dollar.png';
import { useGameDifficulty } from '../../../../../../context/GameDifficultyContext';

const StyledGrid = styled(Grid)`
  height: 75px;
  padding: 15px 40px;
  @media (max-width: 550px) {
    padding: 15px 5px;
  }
`;

const StyledNumberTypography = styled(Typography)`
  padding: 0 5px;
  margin: 0 10px;
  border: 1px solid gray;
  color: #ffb74d;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 850px) {
    font-size: 16px;
  }
  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

const StyledLevelTypography = styled(Typography)`
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 850px) {
    font-size: 16px;
  }
  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

const StyledCoinsTypography = styled(Typography)`
  margin-left: 10px;
  @media (max-width: 1024px) {
    font-size: 20px;
  }
  @media (max-width: 850px) {
    font-size: 16px;
  }
  @media (max-width: 550px) {
    font-size: 14px;
  }
`;

interface ILevelProps {
  id: number;
  coins: number;
  includedWords: string[];
  foundWords: any;
}

export const LevelHeader: React.FC<ILevelProps> = ({
  id,
  coins,
  includedWords,
  foundWords,
}) => {
  const [numberOfRemainingWords, setNumberOfRemainingWords] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sound = useSound();
  const gameDifficulty = useGameDifficulty();

  useEffect(() => {
    setNumberOfRemainingWords(
      getNumberOfRemainingWords(
        includedWords.length,
        foundWords[id]?.length,
        gameDifficulty!.levelDifficulty || 0
      )
    );
  }, [includedWords, foundWords, gameDifficulty, id]);

  useEffect(() => {
    if (numberOfRemainingWords < 1) {
      setIsModalOpen(true);
    }
  }, [numberOfRemainingWords]);

  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid container direction="row" alignItems="center" wrap="nowrap">
        <Tooltip title="Предыдущий уровень">
          <Link
            onClick={() => {
              playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
            }}
            to={`/level/${id - 1}`}
            style={{
              pointerEvents: id === 1 ? 'none' : 'auto',
              opacity: id === 1 ? '0.3' : '1',
            }}
          >
            <IconButton>
              <ArrowBackIos className="icon" />
            </IconButton>
          </Link>
        </Tooltip>
        <StyledLevelTypography color="textPrimary" variant="h5">
          {' '}
          Уровень {id}{' '}
        </StyledLevelTypography>
        <Box>
          {numberOfRemainingWords < 1 ? (
            <Tooltip title="Следующий уровень">
              <Link
                onClick={() => {
                  playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
                }}
                to={`/level/${id + 1}`}
                style={{
                  pointerEvents: id === 10 ? 'none' : 'auto',
                  opacity: id === 10 ? '0.3' : '1',
                }}
              >
                <IconButton>
                  <ArrowForwardIos className="icon" />
                </IconButton>
              </Link>
            </Tooltip>
          ) : (
            <StyledNumberTypography variant="h5">
              {numberOfRemainingWords}{' '}
            </StyledNumberTypography>
          )}
        </Box>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <img src={Dollar} alt="Dollar Icon" width="40wh" height="40vh" />
        <StyledCoinsTypography variant="h5"> {coins} </StyledCoinsTypography>
      </Grid>
      <Statistics foundWords={foundWords} />
      <Tooltip title="Меню">
        <Link
          to="/level"
          onClick={() => {
            playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
          }}
        >
          <IconButton>
            <Menu className="icon" />
          </IconButton>
        </Link>
      </Tooltip>
      {numberOfRemainingWords === 0 ? (
        <Dialog
          onClose={() => {
            setIsModalOpen(false);
          }}
          aria-labelledby="rules"
          open={isModalOpen}
        >
          <DialogContent>
            <Typography gutterBottom>
              {id === 10
                ? 'Поздравляю! Вы прошли все уровни!'
                : 'Поздравляю! Вы открыли следующий уровень!'}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                setIsModalOpen(false);
                playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
              }}
              color="primary"
            >
              Ок
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ''
      )}
    </StyledGrid>
  );
};
