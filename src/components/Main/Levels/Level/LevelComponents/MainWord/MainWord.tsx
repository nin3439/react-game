import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Typography, Button, Grid, Tooltip } from '@material-ui/core';
import {
  BackspaceOutlined,
  HighlightOff,
  CheckCircleOutline,
} from '@material-ui/icons';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSound } from '../../../../../../context/SoundContext';
import { playSound } from '../../../../../../utils/utils';
import { Messages } from './Messages';
import { Clue } from './Clue';
import styled, { css } from 'styled-components';

const StyledInput = styled(Typography)`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  margin: 10px;
  width: 7vw;
  height: 10vh;
  border: 2px solid #ffb74d;
  font-size: 170%;
  transition: all 0.5s;
  &:hover {
    background-color: #ffb74d;
    transition: all 0.5s;
  }
  & .MuiButton-label {
    color: #455a64;
  }
  @media (min-width: 1400px) {
    width: 6vw;
    height: 9vh;
  }
  @media (max-width: 1024px) {
    width: 7vw;
    height: 8vh;
  }
  @media (max-width: 800px) {
    width: 6vw;
    height: 7vh;
    font-size: 130%;
  }
  @media (max-width: 500px) {
    width: 5vw;
    height: 6vh;
  }
  ${(props) =>
    props.disabled
      ? css`
          background-color: #ccc;
        `
      : css`
          background-color: transparent;
        `};
`;

interface ILevelProps {
  levelId: number;
  coins: number;
  setCoins: (coins: any) => void;
  word: string;
  includedWords: string[];
  foundWords: string[];
  setFoundWords: (foundWords: any) => void;
}

interface ILetterProps {
  id: string;
  letter: string;
  isPressed: boolean;
}

interface IFoundWords {
  [levelId: string]: string[];
}

const getLetters = (word: string) =>
  word.split('').map((oneLetter, index) => ({
    id: `${index}`,
    letter: oneLetter,
    isPressed: false,
  }));

export const MainWord: React.FC<ILevelProps> = ({
  levelId,
  coins,
  setCoins,
  word,
  includedWords,
  foundWords,
  setFoundWords,
}) => {
  const [input, setInput] = useState('');
  const [letter, setLetter] = useState<ILetterProps[]>([]);
  const [historyPressLetter, setHistoryPressLetter] = useState<string[]>([]);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const sound = useSound();

  useEffect(() => {
    setLetter(getLetters(word));
  }, [word]);

  const checkWord = () => {
    if (includedWords.includes(input)) {
      setCoins((prev: any) =>
        foundWords?.includes(input) ? prev : prev + input.length
      );
      setHistoryPressLetter([]);
      setLetter((prev: ILetterProps[]) => {
        return prev.map((item: ILetterProps) => {
          return { ...item, isPressed: false };
        });
      });
      setIsMessageOpen(true);
      setTimeout(() => {
        setIsMessageOpen(false);
        setInput('');
        if (!foundWords?.includes(input)) {
          setFoundWords((prev: IFoundWords) => ({
            ...prev,
            [levelId]: [...prev[levelId], input],
          }));
        }
      }, 1000);
    } else {
      setIsMessageOpen(true);
      setTimeout(() => {
        setIsMessageOpen(false);
      }, 1000);
      clearInput();
    }
  };

  const clickOnLetter = (e: MouseEvent<HTMLButtonElement>) => {
    const targetId = e.currentTarget.id;
    setInput((prev: string) => prev + e.currentTarget.value);
    setHistoryPressLetter((prev: string[]) => [...prev, targetId]);
    setLetter((prev: ILetterProps[]) => {
      return prev.map((item: ILetterProps) => {
        if (item.id === targetId) {
          return { ...item, isPressed: !item.isPressed };
        }
        return item;
      });
    });
  };

  const clearInput = () => {
    setInput('');
    setHistoryPressLetter([]);
    setLetter((prev: ILetterProps[]) => {
      return prev.map((item: ILetterProps) => {
        return { ...item, isPressed: false };
      });
    });
  };

  const removeLastLetter = () => {
    setInput((prev: string) => prev.slice(0, prev.length - 1));
    setHistoryPressLetter((prev: string[]) =>
      prev.filter((item, index) => index !== prev.length - 1)
    );
    setLetter((prev: ILetterProps[]) => {
      return prev.map((item: ILetterProps) => {
        if (item.id === historyPressLetter[historyPressLetter.length - 1]) {
          return { ...item, isPressed: !item.isPressed };
        }
        return item;
      });
    });
  };

  useHotkeys('ctrl+space', () => checkWord(), {}, [input]);
  useHotkeys('ctrl+z', () => removeLastLetter(), {}, [historyPressLetter]);
  useHotkeys('ctrl+x', () => clearInput());

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        {isMessageOpen ? (
          <Messages
            input={input}
            foundWords={foundWords}
            includedWords={includedWords}
          />
        ) : (
          <StyledInput
            color="textPrimary"
            variant="h5"
            style={{ textTransform: 'uppercase' }}
          >
            {input}
          </StyledInput>
        )}
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center" alignItems="center">
          {letter.map((oneLetter, index) => {
            return (
              <StyledButton
                id={`${index}`}
                size="large"
                variant="outlined"
                value={oneLetter.letter}
                disabled={oneLetter.isPressed ? true : false}
                onClick={(e) => {
                  clickOnLetter(e);
                  playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
                }}
                key={index}
                color="primary"
              >
                <Typography color="textPrimary" variant="h5">
                  {oneLetter.letter}
                </Typography>
              </StyledButton>
            );
          })}
        </Grid>
      </Grid>
      <Grid item>
        <Box>
          <Tooltip title="Проверить слово">
            <Button
              onClick={() => {
                checkWord();
                playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
              }}
              style={{
                marginTop: '30px',
              }}
            >
              <CheckCircleOutline
                style={{
                  color: 'green',
                  height: '5vh',
                  width: '5vw',
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить последнюю букву">
            <Button
              onClick={() => {
                removeLastLetter();
                playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
              }}
              style={{
                marginTop: '30px',
              }}
            >
              <BackspaceOutlined
                style={{
                  color: 'rosybrown',
                  height: '5vh',
                  width: '5vw',
                }}
              />
            </Button>
          </Tooltip>
          <Tooltip title="Удалить слово">
            <Button
              onClick={() => {
                clearInput();
                playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
              }}
              style={{
                marginTop: '30px',
              }}
            >
              <HighlightOff
                style={{
                  color: 'firebrick',
                  height: '5vh',
                  width: '5vw',
                }}
              />
            </Button>
          </Tooltip>
          <Clue
            includedWords={includedWords}
            foundWords={foundWords}
            coins={coins}
            setCoins={setCoins}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
