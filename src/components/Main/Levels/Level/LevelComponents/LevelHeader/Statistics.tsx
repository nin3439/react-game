import React, { useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  Tooltip,
  DialogTitle,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Paper,
} from '@material-ui/core';
import { Equalizer } from '@material-ui/icons/';
import { playSound } from '../../../../../../utils/utils';
import { useSound } from '../../../../../../context/SoundContext';
import { mockLevels } from '../../../../../../constants/levelsContent';

interface IStatisticsProps {
  foundWords: any;
}

export const Statistics: React.FC<IStatisticsProps> = ({ foundWords }) => {
  const [isStatisticsOpen, setIsStatisticsOpen] = useState(false);
  const sound = useSound();

  const handleClickOpen = () => {
    setIsStatisticsOpen(true);
  };

  const handleClose = () => {
    setIsStatisticsOpen(false);
  };

  const createData = (
    level: number | string,
    nemberIncludedWords: number,
    numberFoundWords: number,
    percentFoundWords: string
  ) => {
    return { level, nemberIncludedWords, numberFoundWords, percentFoundWords };
  };

  const getPercentFoundWords = (
    numberMockLevels: number,
    numberFoundWordsLevel: number
  ) => {
    return (
      ((foundWords[numberFoundWordsLevel]?.length || 0) /
        mockLevels[numberMockLevels].includedWords.length) *
      100
    ).toFixed(1);
  };

  const getAllIncludedWords = () => {
    return mockLevels.reduce(
      (acc, current) => acc + current.includedWords.length,
      0
    );
  };

  const getAllFoundWords = () => {
    return Object.values(foundWords).flat().length;
  };

  const rows = [
    createData(
      1,
      mockLevels[0].includedWords.length,
      foundWords[1]?.length || 0,
      `${getPercentFoundWords(0, 1)}%`
    ),
    createData(
      2,
      mockLevels[1].includedWords.length,
      foundWords[2]?.length || 0,
      `${getPercentFoundWords(1, 2)}%`
    ),
    createData(
      3,
      mockLevels[2].includedWords.length,
      foundWords[3]?.length || 0,
      `${getPercentFoundWords(2, 3)}%`
    ),
    createData(
      4,
      mockLevels[3].includedWords.length,
      foundWords[4]?.length || 0,
      `${getPercentFoundWords(3, 4)}%`
    ),
    createData(
      5,
      mockLevels[4].includedWords.length,
      foundWords[5]?.length || 0,
      `${getPercentFoundWords(4, 5)}%`
    ),
    createData(
      6,
      mockLevels[5].includedWords.length,
      foundWords[6]?.length || 0,
      `${getPercentFoundWords(5, 6)}%`
    ),
    createData(
      7,
      mockLevels[6].includedWords.length,
      foundWords[7]?.length || 0,
      `${getPercentFoundWords(6, 7)}%`
    ),
    createData(
      8,
      mockLevels[7].includedWords.length,
      foundWords[8]?.length || 0,
      `${getPercentFoundWords(7, 8)}%`
    ),
    createData(
      9,
      mockLevels[8].includedWords.length,
      foundWords[9]?.length || 0,
      `${getPercentFoundWords(8, 9)}%`
    ),
    createData(
      10,
      mockLevels[9].includedWords.length,
      foundWords[10]?.length || 0,
      `${getPercentFoundWords(9, 10)}%`
    ),
    createData(
      'Итого',
      getAllIncludedWords(),
      getAllFoundWords(),
      `${(getAllFoundWords() / getAllIncludedWords()).toFixed(1)}%`
    ),
  ];

  return (
    <>
      <Tooltip title="Статистика">
        <IconButton
          onClick={() => {
            handleClickOpen();
            playSound(sound!.volumeSound, 'btns', sound!.isSoundOn);
          }}
        >
          <Equalizer className="icon" />
        </IconButton>
      </Tooltip>
      <Dialog
        onClose={handleClose}
        aria-labelledby="statistics"
        open={isStatisticsOpen}
      >
        <DialogTitle id="statistics-title">Статистика</DialogTitle>
        <DialogContent dividers>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="statistic table">
              <TableHead>
                <TableRow>
                  <TableCell>Уровень</TableCell>
                  <TableCell align="center">Количество слов в уровне</TableCell>
                  <TableCell align="center">
                    Количество найденных слов
                  </TableCell>

                  <TableCell align="center">% найденных слов</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.level}>
                    <TableCell component="th" align="center">
                      {row.level}
                    </TableCell>
                    <TableCell align="center">
                      {row.nemberIncludedWords}
                    </TableCell>
                    <TableCell align="center">{row.numberFoundWords}</TableCell>
                    <TableCell align="center">
                      {row.percentFoundWords}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Ок
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
