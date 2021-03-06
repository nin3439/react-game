import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { LevelHeader } from './LevelComponents/LevelHeader/LevelHeader';
import { SmallWords } from './LevelComponents/SmallWords/SmallWords';
import { MainWord } from './LevelComponents/MainWord/MainWord';
import { mockLevels } from '../../../../constants/levelsContent';
import { Grid } from '@material-ui/core';
import { useStateWithLocalStorage } from '../../../../utils/utils';
import { useGameDifficulty } from '../../../../context/GameDifficultyContext';
import styled from 'styled-components';

const StyledGrid = styled(Grid)`
  height: calc(100vh - 150px);
  max-width: 1280px;
  padding: 0 40px;
  margin: 0 auto;
  @media (min-width: 1500px) {
    max-width: 1400px;
  }
  @media (max-width: 870px) {
    max-width: 800px;
  }
  @media (max-width: 550px) {
    padding: 0 20px;
  }
`;

interface Ilevel {
  number: string;
  isLevelOpen: boolean;
}

interface IlevelsProps {
  levels: Ilevel[];
  setLevels: (levels: any) => void;
}

interface IFoundWords {
  [levelId: string]: string[];
}

const Level: React.FC<IlevelsProps> = ({ setLevels, levels }) => {
  const { params } = useRouteMatch();
  const [coins, setCoins] = useStateWithLocalStorage('coins', 0);
  const gameDifficulty = useGameDifficulty();

  const level = mockLevels.find(
    // @ts-ignore
    (item) => item.id === parseInt(params.number, 10)
  );
  const [foundWords, setFoundWords] = useStateWithLocalStorage(
    'foundWords',
    {}
  );

  useEffect(() => {
    if (level) {
      setFoundWords((prev: IFoundWords) => {
        return {
          ...prev,
          [level.id]: prev[level.id]?.length ? [...prev[level.id]] : [],
        };
      });
    }
  }, [level]);

  useEffect(() => {
    if (level) {
      const levelProgress =
        foundWords[level.id]?.length / level.includedWords.length;
      if (levelProgress >= gameDifficulty!.levelDifficulty / 100) {
        setLevels((prev: any) => {
          return prev.map((item: any) => {
            if (+item.number === level.id + 1) {
              return { ...item, isLevelOpen: !item.isLevelOpen };
            }
            return item;
          });
        });
      }
    }
    // eslint-disable-line react-hooks/exhaustive-deps
  }, [level, foundWords]);

  if (!level) {
    return <span>Не найдено</span>;
  }

  return (
    <>
      <LevelHeader
        id={level.id}
        coins={coins}
        includedWords={level.includedWords}
        foundWords={foundWords}
      />
      <StyledGrid
        container
        direction="column"
        justify="center"
        spacing={2}
        wrap="nowrap"
      >
        <Grid item>
          <SmallWords
            includedWords={level.includedWords}
            foundWords={foundWords[level.id]}
          />
        </Grid>
        <Grid item>
          <MainWord
            levelId={level.id}
            coins={coins}
            setCoins={setCoins}
            word={level.word}
            includedWords={level.includedWords}
            foundWords={foundWords[level.id]}
            setFoundWords={setFoundWords}
          />
        </Grid>
      </StyledGrid>
    </>
  );
};

export default Level;
