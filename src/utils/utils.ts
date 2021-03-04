import React from 'react';

export const getNumberOfRemainingWords = (
  includedWords: number,
  foundWords: number,
  GameDifficulty: number
) => {
  return Math.ceil((GameDifficulty / 100) * includedWords) - foundWords;
};

export const playSound = (
  volume: number,
  typeSound: string,
  isSoundOn: boolean
) => {
  const audio = new Audio();
  const soundBtns = `https://zvukipro.com/uploads/files/2019-09/1568274526_c8fd8d10309e3e0.mp3`;
  const soundLetters = `https://zvukipro.com/uploads/files/2018-10/1540316483_mechanic-button-pressing_fj_hbhno.mp3`;
  audio.src = typeSound === 'letters' ? soundLetters : soundBtns;
  audio.volume = volume / 100;
  if (isSoundOn) {
    audio.play();
  }
};

export const useStateWithLocalStorage = (
  localStorageKey: string,
  initialState: any
) => {
  const [value, setValue] = React.useState(
    JSON.parse(
      localStorage.getItem(localStorageKey) || JSON.stringify(initialState)
    )
  );
  React.useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
