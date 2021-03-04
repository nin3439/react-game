import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid, Switch } from '@material-ui/core';
import Rules from '../Rules';
import { useSound } from '../../../context/SoundContext';
import { playSound } from '../../../utils/utils';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: calc(100vh - 135px);
  row-gap: 30px;
`;

const StyledTypography = styled(Typography)`
  font-size: 106px;
  @media (max-width: 1260px) {
    font-size: 86px;
  }
  @media (max-width: 1000px) {
    font-size: 76px;
  }
  @media (max-width: 800px) {
    font-size: 66px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #3f51b5;
`;

interface IHomeProps {
  isThemeDark: boolean;
  setIsThemeDark: (isThemeLight: boolean) => void;
}

export const Home: React.FC<IHomeProps> = ({ isThemeDark, setIsThemeDark }) => {
  const sound = useSound();
  return (
    <Grid>
      <Grid style={{ margin: '10px 20px' }}>
        <Switch
          checked={isThemeDark}
          onChange={() => setIsThemeDark(!isThemeDark)}
          color="primary"
        />
      </Grid>
      <StyledGrid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <StyledTypography color="textPrimary" variant="h1">
          Слова из Слова
        </StyledTypography>
        <StyledLink
          to="/level"
          onClick={() => {
            playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
          }}
        >
          <Button variant="outlined" color="primary">
            Играть
          </Button>
        </StyledLink>
        <Rules />
      </StyledGrid>
    </Grid>
  );
};
