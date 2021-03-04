import React, { useState } from 'react';
import {
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  Typography,
  DialogContent,
  DialogActions,
  Button,
  Slider,
  Select,
  MenuItem,
  Checkbox,
} from '@material-ui/core';
import { useSound } from '../../context/SoundContext';
import { playSound } from '../../utils/utils';
import { useGameDifficulty } from '../../context/GameDifficultyContext';
import { useHotkeys } from 'react-hotkeys-hook';
import { Settings, VolumeDown, VolumeUp } from '@material-ui/icons';

interface ISettingsProps {
  volumeMusic: number;
  setVolumeMusic: (volumeMusic: number) => void;
  isMusicOn: boolean;
  setIsMusicOn: (isMusicOn: boolean) => void;
}

export const SettingsComponent: React.FC<ISettingsProps> = ({
  volumeMusic,
  setVolumeMusic,
  isMusicOn,
  setIsMusicOn,
}) => {
  const [openSettings, setOpenSettings] = useState(false);
  const sound = useSound();
  const gameDifficulty = useGameDifficulty();

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const handleChangeVolumeMusic = (event: any, newValue: number | number[]) => {
    setVolumeMusic(newValue as number);
  };

  const handleChangeVolumeSound = (event: any, newValue: number | number[]) => {
    sound?.setVolumeSound(newValue as number);
  };

  const handleChangeSelect = (event: React.ChangeEvent<{ value: unknown }>) => {
    gameDifficulty?.setLevelDifficulty(event.target.value as number);
  };

  useHotkeys('ctrl+f', () => handleSettingsOpen());

  return (
    <Box>
      <IconButton
        style={{ marginBottom: '-10px' }}
        onClick={() => {
          handleSettingsOpen();
          playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
        }}
      >
        <Settings />
      </IconButton>
      <Dialog
        onClose={handleSettingsClose}
        aria-labelledby="rules"
        open={openSettings}
      >
        <DialogTitle id="settings-title">Настройки игры</DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            direction="row"
            // justify="space-between"
            alignItems="center"
          >
            <Typography id="music-slider" gutterBottom>
              Музыка
            </Typography>
            <Checkbox
              checked={isMusicOn}
              onChange={() => setIsMusicOn(!isMusicOn)}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              color="primary"
              onClick={() => {
                playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
              }}
            />
          </Grid>

          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={volumeMusic}
                onChange={handleChangeVolumeMusic}
                aria-labelledby="music-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            // justify="space-between"
            alignItems="center"
          >
            <Typography id="music-slider" gutterBottom>
              Звук
            </Typography>
            <Checkbox
              checked={sound!.isSoundOn}
              onChange={() => {
                sound!.setIsSoundOn(!sound?.isSoundOn);
              }}
              inputProps={{ 'aria-label': 'primary checkbox' }}
              color="primary"
              onClick={() => {
                playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
              }}
            />
          </Grid>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={sound!.volumeSound}
                onChange={handleChangeVolumeSound}
                aria-labelledby="sound-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Typography id="level-difficulty" style={{ marginRight: '10px' }}>
              Уровень сложности
            </Typography>
            <Select
              value={gameDifficulty!.levelDifficulty}
              onChange={handleChangeSelect}
              displayEmpty
            >
              <MenuItem value={70}>70%</MenuItem>
              <MenuItem value={50}>50%</MenuItem>
              <MenuItem value={30}>30%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
            </Select>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleSettingsClose} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
