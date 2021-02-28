import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Switch } from '@material-ui/core';
import Rules from '../Rules';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: calc(100vh - 115px);
  row-gap: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3f51b5;
`;

export const Home: React.FC = () => {
  return (
    <Grid>
      <Grid>
        <Switch
          // checked={isLightTheme}
          // onChange={() => setIsLightTheme(!isLightTheme)}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </Grid>
      <StyledGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography color="textPrimary" variant="h1" component="h2">
          Слова из Слова
        </Typography>
        <StyledLink to="/level">
          <Button variant="outlined" color="primary">
            Играть
          </Button>
        </StyledLink>
        <Rules />
      </StyledGrid>
    </Grid>
  );
};
