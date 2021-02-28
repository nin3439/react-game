import { Grid, Typography } from '@material-ui/core';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  padding: 0 50px;
  columns: 8;
`;
const StyledTypography = styled(Typography)`
  @media (max-width: 1024px) {
    font-size: 20px;
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
            {foundWords?.includes(word)
              ? word.toUpperCase()
              : word.replace(word, '*'.repeat(word.length))}
          </StyledTypography>
        );
      })}
    </StyledGrid>
  );
};
