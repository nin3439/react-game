import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  IconButton,
  Grid,
  Typography,
  Tooltip,
} from '@material-ui/core';
import { Home } from '@material-ui/icons';
import Lock from '../../../../assets/lock.png';
import { useSound } from '../../../../context/SoundContext';
import { playSound } from '../../../../utils/utils';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledHeaderGrid = styled(Grid)`
  padding: 15px 40px;
  height: 75px;
`;

const StyledGrid = styled(Grid)`
  padding: 15px 40px;
  height: calc(100vh - 136px);
`;

const StyledButton = styled(Button)`
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
  margin: 15px;
  width: 20vw;
  height: 20vh;
  font-size: 26px;
  border: 2px solid #ffb74d;
  transition: all 1s;
  &:hover {
    background-color: #ffb74d;
    transition: all 1s;
  }
  & .MuiButton-label {
    column-gap: 10px;
  }
  @media (max-width: 1260px) {
    width: 17vw;
    height: 17vh;
    margin: 4px;
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
  const sound = useSound();
  return (
    <>
      <StyledHeaderGrid
        container
        direction="row"
        justify="flex-end"
        alignItems="center"
      >
        <Tooltip title="На главную">
          <Link
            to="/"
            onClick={() => {
              playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
            }}
          >
            <IconButton>
              <Home />
            </IconButton>
          </Link>
        </Tooltip>
      </StyledHeaderGrid>
      <StyledGrid container justify="center" spacing={2}>
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
                onClick={() => {
                  playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
                }}
              >
                <Typography color="textPrimary" variant="h5">
                  {' '}
                  {level.number}
                </Typography>
                {level.isLevelOpen ? (
                  ''
                ) : (
                  <img src={Lock} alt="Lock Icon" width="40wh" height="40vh" />
                )}
              </StyledButton>
            </StyledLink>
          </Grid>
        ))}
      </StyledGrid>
    </>
  );
};
export default AllLevels;
