import React, { useState, MouseEvent } from 'react';
import {
  Typography,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';
import { dictionary } from '../../../../../constants/dictionary';
import { useSound } from '../../../../../context/SoundContext';
import { playSound } from '../../../../../utils/utils';
import styled from 'styled-components';

const StyledTypography = styled(Typography)`
  &:hover {
    cursor: pointer;
  }
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

interface IOpenSmallWordProps {
  word: string;
}

export const OpenSmallWord: React.FC<IOpenSmallWordProps> = ({ word }) => {
  const [openModal, setOpenModal] = useState(false);
  const sound = useSound();

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <StyledTypography
        color="textPrimary"
        variant="h5"
        onClick={(e: any) => {
          if (e.target.textContent === word.toUpperCase()) {
            handleClickOpen();
            playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
          }
        }}
      >
        {word.toUpperCase()}
      </StyledTypography>{' '}
      <Dialog onClose={handleClose} open={openModal}>
        <DialogTitle id="meaning-of-word">Значение слова</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>{dictionary[word]}</Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClose();
              playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
            }}
            color="primary"
          >
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
