import { Box, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  words: {
    columns: '8',
    padding: '20px',
  },
}));

interface ILevelProps {
  includedWords: string[];
  foundWords: string[];
}

export const SmallWords: React.FC<ILevelProps> = ({
  includedWords,
  foundWords,
}) => {
  const classMaterial: Record<'words', string> = useStyles();
  return (
    <Box className={classMaterial.words}>
      {includedWords!.map((word) => {
        return (
          <Box>
            {foundWords.includes(word)
              ? word.toUpperCase()
              : word.replace(word, '.'.repeat(word.length))}
          </Box>
        );
      })}
    </Box>
  );
};
