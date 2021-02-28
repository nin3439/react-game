import React, { useState } from 'react';
import {
  Button,
  DialogTitle,
  Dialog,
  Typography,
  DialogContent,
  DialogActions,
  Box,
} from '@material-ui/core/';

const Rules = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Правила
      </Button>
      <Dialog onClose={handleClose} aria-labelledby="rules" open={open}>
        <DialogTitle id="rules-title">Правила игры</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Слова могут быть существительными в единственном числе, а также во
            множественном числе, если такие слова не существуют в единственном
            (например: дрова, вилы, очки), без уменьшительно-ласкательных.
          </Typography>
          <Typography gutterBottom>Все бувкы Ё заменены на буквы Е.</Typography>
          <Typography gutterBottom>
            Чтобы открыть следующий уровень, необходимо угадать 70% слов
            текущего уровня.
          </Typography>
          <Typography gutterBottom>
            За угаданные слова начисляются баллы, в количестве равном количеству
            букв в угаданном слове.
          </Typography>
          <Typography gutterBottom>
            Баллы можно использовать для получения подсказки, для этого нужно
            нажать на иконку с подсказкой.
          </Typography>
          <Typography gutterBottom>
            Если нажать на одно из угаданных слов, появится окно со значением
            этого слова.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Rules;
