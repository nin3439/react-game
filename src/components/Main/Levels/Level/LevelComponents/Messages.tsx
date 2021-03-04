import React from 'react';
import { Grid, SnackbarContent } from '@material-ui/core';

interface IMessagesProps {
  input: string;
  foundWords: any;
  includedWords: string[];
}

export const Messages: React.FC<IMessagesProps> = ({
  input,
  foundWords,
  includedWords,
}) => {
  return foundWords.includes(input) ? (
    <Grid container alignItems="center" style={{ height: '10vh' }}>
      <SnackbarContent
        style={{ backgroundColor: 'rosybrown', color: '#fafafa' }}
        message={'Слово уже отгадано.'}
      />
    </Grid>
  ) : includedWords.includes(input) ? (
    <Grid container alignItems="center" style={{ height: '10vh' }}>
      <SnackbarContent
        style={{ backgroundColor: 'green', color: '#fafafa' }}
        message={'Слово засчитано.'}
      />
    </Grid>
  ) : (
    <Grid container alignItems="center" style={{ height: '10vh' }}>
      <SnackbarContent
        style={{ backgroundColor: 'firebrick', color: '#fafafa' }}
        message={'Слово не засчитано.'}
      />
    </Grid>
  );
};
