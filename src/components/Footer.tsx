import React from 'react';
import { Box, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
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

const Footer = () => {
  const classMaterial: Record<
    'footer' | 'link' | 'rssImage',
    string
  > = useStyles();
  return (
    <Box className={classMaterial.footer}>
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
    </Box>
  );
};

export default Footer;
