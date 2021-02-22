import React from 'react';
import { Box, Link } from '@material-ui/core';
import { useStyles } from './FooterMaterialStyles';

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
