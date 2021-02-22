import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, Button, Box, Typography } from '@material-ui/core';
import { Home } from '@material-ui/icons/';
import { mokLevels } from '../../../../constants/levelsContent';
import { useStyles } from './LevelMaterialStyles';

const Level = (props: any) => {
  const [input, setInput] = useState('');
  const classMaterial: Record<
    'header' | 'words' | 'largeWord',
    string
  > = useStyles();
  const level = mokLevels.filter(
    (item) => item.id === parseInt(props.match.params.number, 10)
  );
  const word = level[0].word.toUpperCase().split('');
  const smallWords = level[0].smallWords;
  return (
    <>
      <Box className={classMaterial.header}>
        <Typography> Уровень {level[0].id} </Typography>
        <IconButton>
          <Link to="/level">
            <Home />
          </Link>
        </IconButton>
      </Box>
      <Box className={classMaterial.words}>
        {smallWords!.map((word) => {
          return <Box>{word.toUpperCase()}</Box>;
        })}
      </Box>
      <Typography>{input}</Typography>
      <Box className={classMaterial.largeWord}>
        {word.map((letter) => {
          return (
            <Button
              size="large"
              variant="outlined"
              value={letter}
              onClick={(e) => {
                setInput((prev) => prev + e.currentTarget.value);
              }}
            >
              {letter}
            </Button>
          );
        })}
      </Box>
    </>
  );
};
export default Level;
