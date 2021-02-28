import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Typography, Button, Grid } from '@material-ui/core';
import {
  BackspaceOutlined,
  HighlightOff,
  CheckCircleOutline,
} from '@material-ui/icons';
import styled, { css } from 'styled-components';

const StyledInput = styled(Typography)`
  height: 10vh;
  display: flex;
  align-items: center;
`;

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  margin: 10px 10px 30px;
  width: 7vw;
  height: 10vh;
  border: 2px solid #ffb74d;
  font-size: 170%;

  &:hover {
    background-color: #ffb74d;
  }
  & .MuiButton-label {
    color: #455a64;
  }
  ${(props) =>
    props.disabled
      ? css`
          background-color: #ccc;
        `
      : css`
          background-color: #fff;
        `};
`;

interface ILevelProps {
  levelId: number;
  setCoins: (coins: any) => void;
  word: string;
  includedWords: string[];
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
  setFoundWords,
}) => {
  const [input, setInput] = useState('');
  const [letter, setLetter] = useState<ILetterProps[]>([]);
  const [historyPressLetter, setHistoryPressLetter] = useState<string[]>([]);

  useEffect(() => {
    setLetter(getLetters(word));
  }, [word]);

  const checkWord = () => {
    if (includedWords.includes(input)) {
      setFoundWords((prev: IFoundWords) => ({
        ...prev,
        [levelId]: [...prev[levelId], input],
      }));
      setCoins((prev: any) => {
        return prev + input.length;
      });
      setInput('');
      setHistoryPressLetter([]);
      setLetter((prev: ILetterProps[]) => {
        return prev.map((item: ILetterProps) => {
          return { ...item, isPressed: false };
        });
      });
    } else {
      console.log('false');
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

  // const keyPress = (event: globalThis.KeyboardEvent) => {
  //   console.log(event.key);
  //   if (event.key === 'Enter') {
  //     checkWord();
  //   }
  // };

  // document.addEventListener('keypress', (event) => keyPress(event));

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

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={2}
    >
      <Grid item>
        <StyledInput
          color="textPrimary"
          variant="h5"
          style={{ textTransform: 'uppercase' }}
        >
          {input}
        </StyledInput>
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
                onClick={clickOnLetter}
                key={index}
                color="primary"
              >
                {oneLetter.letter}
              </StyledButton>
            );
          })}
        </Grid>
      </Grid>
      <Grid item>
        <Box>
          <Button onClick={checkWord}>
            <CheckCircleOutline
              style={{
                color: 'green',
                height: '5vh',
                width: '5vw',
              }}
            />
          </Button>
          <Button onClick={removeLastLetter}>
            <BackspaceOutlined
              style={{
                color: 'rosybrown',
                height: '5vh',
                width: '5vw',
              }}
            />
          </Button>
          <Button onClick={clearInput}>
            <HighlightOff
              style={{
                color: 'firebrick',
                height: '5vh',
                width: '5vw',
              }}
            />
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
