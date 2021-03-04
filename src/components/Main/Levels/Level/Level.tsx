import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { LevelHeader } from './LevelComponents/LevelHeader';
import { SmallWords } from './LevelComponents/SmallWords';
import { MainWord } from './LevelComponents/MainWord';
import { mockLevels } from '../../../../constants/levelsContent';
import { Grid } from '@material-ui/core';
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
  const [coins, setCoins] = useState(0);

  const level = mockLevels.find(
    // @ts-ignore
    (item) => item.id === parseInt(params.number, 10)
  );
  const [foundWords, setFoundWords] = useState<IFoundWords>({});

  useEffect(() => {
    if (level) {
      setFoundWords((prev: IFoundWords) => ({
        ...prev,
        [level.id]: [],
      }));
    }
  }, [level]);

  useEffect(() => {
    if (level) {
      const levelProgress =
        foundWords[level.id]?.length || 0 / level.includedWords.length;
      if (levelProgress >= 0.1) {
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
  }, [level]);

  if (!level) {
    return <span>Не найдено</span>;
  }

  return (
    <>
      <LevelHeader
        id={level.id}
        coins={coins}
        includedWords={level.includedWords}
        foundWords={foundWords[level.id]}
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
