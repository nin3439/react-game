import React, { useEffect, useState } from 'react';
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
} from '@material-ui/core';
import { Settings, VolumeDown, VolumeUp } from '@material-ui/icons';

export const SettingsComponent: React.FC = () => {
  const [openSettings, setOpenSettings] = useState(false);
  const [volumeMusic, setVolumeMusic] = useState<number>(30);
  const [volumeSound, setVolumeSound] = useState<number>(30);

  const playMusic = () => {
    const audio = new Audio();
    audio.src = `https://zvukipro.com/uploads/files/2019-05/1559046191_2b52b40e2a3d9f6.mp3`;
    audio.loop = true;
    audio.volume = volumeMusic / 100;
    audio.play();
  };

  const handleSettingsOpen = () => {
    setOpenSettings(true);
  };

  const handleSettingsClose = () => {
    setOpenSettings(false);
  };

  const handleChangeVolumeMusic = (event: any, newValue: number | number[]) => {
    console.log(newValue);
    setVolumeMusic(newValue as number);
  };

  const handleChangeVolumeSound = (event: any, newValue: number | number[]) => {
    console.log(newValue);
    setVolumeSound(newValue as number);
  };

  const playSound = () => {
    const audio = new Audio();
    audio.src = `https://zvukipro.com/uploads/files/2018-10/1540316483_mechanic-button-pressing_fj_hbhno.mp3`;
    audio.play();
    audio.volume = volumeSound / 100;
  };

  useEffect(() => {
    playMusic();
  }, []);

  return (
    <Box>
      <IconButton
        onClick={() => {
          handleSettingsOpen();
          playSound();
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
          <Typography id="music-slider" gutterBottom>
            Громкость музыки
          </Typography>
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
          <Typography id="sound-slider" gutterBottom>
            Громкость звуков
          </Typography>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <VolumeDown />
            </Grid>
            <Grid item xs>
              <Slider
                value={volumeSound}
                onChange={handleChangeVolumeSound}
                aria-labelledby="sound-slider"
              />
            </Grid>
            <Grid item>
              <VolumeUp />
            </Grid>
          </Grid>
          {/* <Select value={age} onChange={handleChange} displayEmpty>
            <MenuItem value={70}>70%</MenuItem>
            <MenuItem value={50}>50%</MenuItem>
            <MenuItem value={30}>30%</MenuItem>
            <MenuItem value={10}>10%</MenuItem>
          </Select> */}
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
