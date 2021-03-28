import React, { useContext, useState } from 'react';
import { useStateWithLocalStorage } from '../utils/utils';

interface IChildren {
  children: React.ReactNode;
}

interface GameDifficultyContextType {
  levelDifficulty: number;
  setLevelDifficulty: (volumeMusic: number) => void;
}

const GameDifficultyContext = React.createContext<
  GameDifficultyContextType | undefined
>(undefined);

export const useGameDifficulty = () => {
  return useContext(GameDifficultyContext);
};

export const GameDifficultyProvider = ({ children }: IChildren) => {
  const [levelDifficulty, setLevelDifficulty] = useStateWithLocalStorage(
    'levelDifficulty',
    50
  );

  return (
    <GameDifficultyContext.Provider
      value={{ levelDifficulty, setLevelDifficulty }}
    >
      {children}
    </GameDifficultyContext.Provider>
  );
};
