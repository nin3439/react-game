import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
  },
  words: {
    columns: '8',
    padding: '20px',
  },
  largeWord: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
