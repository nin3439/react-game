import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  main: {
    height: '93vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '30px',
  },
  link: {
    textDecoration: 'none',
    color: '#3f51b5',
  },
}));
