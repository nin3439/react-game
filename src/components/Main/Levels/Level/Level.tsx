import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { LevelHeader } from './LevelComponents/LevelHeader';
import { SmallWords } from './LevelComponents/SmallWords';
import { MainWord } from './LevelComponents/MainWord';
import { mockLevels } from '../../../../constants/levelsContent';

const Level = () => {
  const { params } = useRouteMatch();
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const level = mockLevels.filter(
    // @ts-ignore
    (item) => item.id === parseInt(params.number, 10)
  );
  const word = level[0].word.split('');
  const includedWords = level[0].includedWords;
  return (
    <>
      <LevelHeader id={level[0].id} />
      <SmallWords includedWords={includedWords} foundWords={foundWords} />
      <MainWord
        word={word}
        includedWords={includedWords}
        setFoundWords={setFoundWords}
      />
    </>
  );
};
export default Level;
