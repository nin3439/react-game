import React from 'react';
import { Link } from 'react-router-dom';
import { Button, IconButton, Grid, Box } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import Lock from '../../../../assets/lock.png';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledGrid = styled(Grid)`
  padding: 15px 40px;
`;

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin: 15px;
  width: 20vw;
  height: 20vh;
  font-size: 26px;
  border: 2px solid #ffb74d;
  &:hover {
    background-color: #ffb74d;
  }
  & .MuiButton-label {
    color: #455a64;
    column-gap: 10px;
    font-size: 26px;
  }
`;

interface Ilevel {
  number: string;
  isLevelOpen: boolean;
}

interface IlevelsProps {
  levels: Ilevel[];
}

const AllLevels: React.FC<IlevelsProps> = ({ levels }) => {
  return (
    <>
      <StyledGrid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Link to="/">
          <IconButton>
            <ArrowBackIos />
          </IconButton>
        </Link>
        <Box>Прогресс %</Box>
      </StyledGrid>
      <Grid container justify="center" spacing={3}>
        {levels.map((level, index) => (
          <Grid key={level.number} item>
            <StyledLink
              to={`/level/${index + 1}`}
              style={{
                pointerEvents: level.isLevelOpen ? 'auto' : 'none',
              }}
            >
              <StyledButton
                variant="outlined"
                color="primary"
                disabled={!level.isLevelOpen}
              >
                {level.number}
                {level.isLevelOpen ? (
                  ''
                ) : (
                  <img src={Lock} alt="Lock Icon" width="40wh" height="40vh" />
                )}
              </StyledButton>
            </StyledLink>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
export default AllLevels;
