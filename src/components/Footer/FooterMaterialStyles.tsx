import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  footer: {
    height: '7vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  link: {
    textDecoration: 'none',
    marginRight: '10px',
  },
  rssImage: {
    width: '45px',
    height: '45px',
    marginLeft: '10px',
  },
}));
