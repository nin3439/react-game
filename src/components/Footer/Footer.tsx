import React from 'react';
import { Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { SettingsComponent } from './Settings';

const useStyles = makeStyles((theme) => ({
  footer: {
    height: '75px',
    padding: '0 30px',
  },
  box: {
    width: '150px',
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

const Footer: React.FC = () => {
  const classMaterial: Record<
    'footer' | 'link' | 'rssImage' | 'box',
    string
  > = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      wrap="nowrap"
      className={classMaterial.footer}
    >
      <SettingsComponent />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classMaterial.box}
      >
        <Link className={classMaterial.link} href="https://github.com/nin3439">
          nin3439
        </Link>
        2021
        <Link href="https://rs.school/">
          <img
            src="https://rs.school/images/rs_school.svg"
            alt="RSS Logo"
            className={classMaterial.rssImage}
          />
        </Link>
      </Grid>
    </Grid>
  );
};

export default Footer;
