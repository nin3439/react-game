import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Typography, Button, Grid, Zoom } from '@material-ui/core';
import {
  BackspaceOutlined,
  HighlightOff,
  CheckCircleOutline,
} from '@material-ui/icons';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSound } from '../../../../../context/SoundContext';
import { playSound } from '../../../../../utils/utils';
import styled, { css } from 'styled-components';
import { Messages } from './Messages';

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
  setCoins: (coins: any) => void;
  word: string;
  includedWords: string[];
  foundWords: any;
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
    console.log(input);
    if (includedWords.includes(input)) {
      setCoins((prev: any) => {
        return prev + input.length;
      });
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
        setFoundWords((prev: IFoundWords) => ({
          ...prev,
          [levelId]: [...prev[levelId], input],
        }));
      }, 1000);
    } else {
      console.log('else');
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
    setLetter((prev: ILetterProps[]) => {
      return prev.map((item: ILetterProps) => {
        console.log(item.id, historyPressLetter[historyPressLetter.length - 1]);
        if (item.id === historyPressLetter[historyPressLetter.length - 1]) {
          return { ...item, isPressed: !item.isPressed };
        }
        return item;
      });
    });
    setHistoryPressLetter((prev: string[]) => {
      prev.pop();
      return prev;
    });
  };

  useHotkeys('ctrl+space', () => checkWord());
  useHotkeys('ctrl+z', () => removeLastLetter());
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
          <Zoom in={isMessageOpen}>
            <Messages
              input={input}
              foundWords={foundWords}
              includedWords={includedWords}
            />
          </Zoom>
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
          <Button
            onClick={() => {
              checkWord();
              playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
            }}
          >
            <CheckCircleOutline
              style={{
                color: 'green',
                height: '5vh',
                width: '5vw',
                marginTop: '30px',
              }}
            />
          </Button>
          <Button
            onClick={() => {
              removeLastLetter();
              playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
            }}
          >
            <BackspaceOutlined
              style={{
                color: 'rosybrown',
                height: '5vh',
                width: '5vw',
                marginTop: '30px',
              }}
            />
          </Button>
          <Button
            onClick={() => {
              clearInput();
              playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
            }}
          >
            <HighlightOff
              style={{
                color: 'firebrick',
                height: '5vh',
                width: '5vw',
                marginTop: '30px',
              }}
            />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
