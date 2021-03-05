import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { OpenSmallWord } from './OpenSmallWord';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding: 0 50px;
  columns: 8;
  @media (max-width: 1024px) {
    padding: 0 30px;
    columns: 6;
  }
  @media (max-width: 850px) {
    padding: 0;
    columns: 5;
  }
`;
const StyledTypography = styled(Typography)`
  @media (min-width: 1400px) {
    font-size: 30px;
  }
  @media (max-width: 1024px) {
    font-size: 25px;
  }
  @media (max-width: 850px) {
    font-size: 20px;
  }
  @media (max-width: 550px) {
    font-size: 17px;
  }
`;

interface ILevelProps {
  includedWords: string[];
  foundWords: string[];
}

export const SmallWords: React.FC<ILevelProps> = ({
  includedWords,
  foundWords,
}) => {
  return (
    <StyledGrid>
      {includedWords!.map((word, index) => {
        return (
          <StyledTypography key={index} color="textPrimary" variant="h5">
            {foundWords?.includes(word) ? (
              <OpenSmallWord word={word} />
            ) : (
              word.replace(word, '*'.repeat(word.length))
            )}
          </StyledTypography>
        );
      })}
    </StyledGrid>
  );
};
