import React from 'react';
import { Grid, Link, Typography } from '@material-ui/core';
import { SettingsComponent } from './Settings';
import styled from 'styled-components';

const StyledFooterGrid = styled(Grid)`
  padding: 0 30px;
  height: 75px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  margin: 0 10px;
`;

interface IFooterProps {
  volumeMusic: number;
  setVolumeMusic: (volumeMusic: number) => void;
  isMusicOn: boolean;
  setIsMusicOn: (isMusicOn: boolean) => void;
}

const Footer: React.FC<IFooterProps> = ({
  volumeMusic,
  setVolumeMusic,
  isMusicOn,
  setIsMusicOn,
}) => {
  return (
    <StyledFooterGrid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
    >
      <SettingsComponent
        volumeMusic={volumeMusic}
        setVolumeMusic={setVolumeMusic}
        isMusicOn={isMusicOn}
        setIsMusicOn={setIsMusicOn}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        style={{ width: '350px' }}
      >
        {' '}
        <Typography color="textPrimary" variant="body1" align="center">
          Игра создана
          <StyledLink href="https://github.com/nin3439">nin3439</StyledLink>
          для
          <Link href="https://rs.school/">
            <img
              src="https://rs.school/images/rs_school.svg"
              alt="RSS Logo"
              width="45px"
              height="45px"
              style={{ margin: '0 10px -15px' }}
            />
          </Link>
          2021
        </Typography>
      </Grid>
    </StyledFooterGrid>
  );
};

export default Footer;
