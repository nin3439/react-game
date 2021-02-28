import React, { useEffect, useState } from 'react';
import { IconButton, Typography, Grid, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons/';
import { getNumberOfRemainingWords } from '../../../../../utils/utils';
import styled from 'styled-components';
import Dollar from '../../../../../assets/dollar.png';

const StyledGrid = styled(Grid)`
  height: 75px;
  padding: 15px 40px;
`;

const StyleTypography = styled(Typography)`
  padding: 0 5px;
  margin: 0 10px;
  border: 1px solid gray;
  color: #ffb74d;
`;

interface ILevelProps {
  id: number;
  coins: number;
  includedWords: string[];
  foundWords: string[];
}

export const LevelHeader: React.FC<ILevelProps> = ({
  id,
  coins,
  includedWords,
  foundWords,
}) => {
  const [numberOfRemainingWords, setNumberOfRemainingWords] = useState(0);

  useEffect(() => {
    setNumberOfRemainingWords(
      getNumberOfRemainingWords(includedWords.length, foundWords?.length || 0)
    );
  }, [includedWords, foundWords]);

  return (
    <StyledGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <Grid container direction="row" alignItems="center">
        <Link
          to={`/level/${id - 1}`}
          style={{
            pointerEvents: id === 1 ? 'none' : 'auto',
          }}
        >
          <IconButton>
            <ArrowBackIos />
          </IconButton>
        </Link>
        <Typography color="textPrimary" variant="h5">
          {' '}
          Уровень {id}{' '}
        </Typography>
        <Box>
          {numberOfRemainingWords < 1 ? (
            <Link
              to={`/level/${id + 1}`}
              style={{
                pointerEvents: id === 10 ? 'none' : 'auto',
              }}
            >
              <IconButton>
                <ArrowForwardIos />
              </IconButton>
            </Link>
          ) : (
            <StyleTypography variant="h5">
              {numberOfRemainingWords}{' '}
            </StyleTypography>
          )}
        </Box>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <img src={Dollar} alt="Dollar Icon" width="40wh" height="40vh" />
        <Typography variant="h5" style={{ marginLeft: '10px' }}>
          {' '}
          {coins}{' '}
        </Typography>
      </Grid>
      <Link to="/level">
        <IconButton>
          <Home />
        </IconButton>
      </Link>
    </StyledGrid>
  );
};
