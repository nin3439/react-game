import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from '@material-ui/core';
import { HelpOutline } from '@material-ui/icons';
import { dictionary } from '../../../../../../constants/dictionary';
import { useSound } from '../../../../../../context/SoundContext';
import { playSound } from '../../../../../../utils/utils';

interface IOpenSmallWordProps {
  includedWords: string[];
  foundWords: string[];
  coins: number;
  setCoins: (coins: any) => void;
}

export const Clue: React.FC<IOpenSmallWordProps> = ({
  includedWords,
  foundWords,
  coins,
  setCoins,
}) => {
  const [isClueOpen, setIsClueOpen] = useState(false);
  const [clue, setClue] = useState('');
  const sound = useSound();

  const handlClueOpen = () => {
    setIsClueOpen(true);
  };
  const handleClueClose = () => {
    setIsClueOpen(false);
  };
  useEffect(() => {
    const notFoundWords = includedWords.filter(
      (word) => !foundWords?.includes(word)
    );
    const randomWord =
      notFoundWords[Math.floor(Math.random() * notFoundWords.length)];
    if (isClueOpen) {
      setClue(randomWord);
    }
  }, [isClueOpen]);

  return (
    <>
      <Tooltip title="Подсказка стоит 5 монет">
        <Button
          onClick={() => {
            handlClueOpen();
            playSound(sound!.volumeSound, 'letters', sound!.isSoundOn);
          }}
          style={{
            marginTop: '30px',
          }}
        >
          <HelpOutline
            style={{
              color: '#d47e00',
              height: '5vh',
              width: '5vw',
            }}
          />
        </Button>
      </Tooltip>
      <Dialog onClose={handleClueClose} open={isClueOpen}>
        <DialogTitle id="clue">Подсказка</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {coins > 4
              ? dictionary[clue]
              : includedWords.length === foundWords?.length
              ? 'Вы нашли все слова на текущем уровне.'
              : 'У вас недостаточно монет. Стоимость подсказки 5 монет.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              handleClueClose();
              if (coins > 4) {
                setCoins((prev: any) => prev - 5);
              }
              playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
            }}
            color="primary"
          >
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
