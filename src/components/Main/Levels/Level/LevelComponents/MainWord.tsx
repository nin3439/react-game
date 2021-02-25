import React, { useState, MouseEvent, useEffect } from 'react';
import { Box, Typography, Button, makeStyles } from '@material-ui/core';
import {
  Backspace,
  HighlightOff,
  CheckCircleOutline,
} from '@material-ui/icons';
import styled, { css } from 'styled-components';

const useStyles = makeStyles({
  largeWord: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
  },
  input: {
    height: '10vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    textTransform: 'uppercase',
  },
});

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  padding: 7px 14px;
  width: 5vw;
  height: 5vh;
  &:hover {
    background-color: #5469d4;
  }
  & .MuiButton-label {
    color: #000;
  }
  ${(props) =>
    props.disabled
      ? css`
          background: red;
        `
      : css`
          background-color: #6772e5;
        `};
`;

interface ILevelProps {
  word: string[];
  includedWords: string[];
  setFoundWords: (foundWords: any) => void;
}

interface ILetterProps {
  id: string;
  letter: string;
  isPressed: boolean;
}

export const MainWord: React.FC<ILevelProps> = ({
  word,
  includedWords,
  setFoundWords,
}) => {
  const [input, setInput] = useState('');
  const [letter, setLetter] = useState<ILetterProps[]>([]);
  const [pressHistoryId, setPressHistoryId] = useState<string[]>([]);
  let arrLetters: any = [];
  arrLetters = word.map((oneLetter, index) => {
    return {
      id: `${index}`,
      letter: oneLetter,
      isPressed: false,
    };
  });

  useEffect(() => {
    setLetter(arrLetters);
    // eslint-disable-line react-hooks/exhaustive-deps
  }, []);

  const classMaterial: Record<'input' | 'largeWord', string> = useStyles();

  const checkWord = () => {
    if (includedWords.includes(input)) {
      setFoundWords((prev: any) => [...prev, input]);
      setInput('');
      setPressHistoryId([]);
      setLetter((prev: any) => {
        return prev.map((item: any) => {
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
    setPressHistoryId((prev: any) => [...prev, targetId]);
    setLetter((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === targetId) {
          return { ...item, isPressed: !item.isPressed };
        }
        return item;
      });
    });
  };
  const clearInput = () => {
    setInput('');
    setPressHistoryId([]);
    setLetter((prev: any) => {
      return prev.map((item: any) => {
        return { ...item, isPressed: false };
      });
    });
  };

  const removeLastLetter = () => {
    setInput((prev: string) => prev.slice(0, prev.length - 1));
    setLetter((prev: any) => {
      return prev.map((item: any) => {
        if (item.id === pressHistoryId[pressHistoryId.length - 1]) {
          return { ...item, isPressed: !item.isPressed };
        }
        return item;
      });
    });
    setPressHistoryId((prev: string[]) => {
      prev.pop();
      return prev;
    });
  };
  return (
    <>
      <Box className={classMaterial.input}>
        <Box>подсказки</Box>
        <Typography>{input}</Typography>
        <Box>
          <Button onClick={checkWord}>
            <CheckCircleOutline />
          </Button>
          <Button onClick={removeLastLetter}>
            <Backspace />
          </Button>
          <Button onClick={clearInput}>
            <HighlightOff />
          </Button>
        </Box>
      </Box>
      <Box className={classMaterial.largeWord}>
        {letter.map((oneLetter, index) => {
          return (
            <StyledButton
              id={`${index}`}
              size="large"
              variant="outlined"
              value={oneLetter.letter}
              disabled={oneLetter.isPressed ? true : false}
              onClick={clickOnLetter}
            >
              {oneLetter.letter}
            </StyledButton>
          );
        })}
      </Box>
    </>
  );
};
