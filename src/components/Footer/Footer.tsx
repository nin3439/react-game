import React from 'react';
import classes from './Footer.module.scss';

const Footer = () => {
  return (
    <div className={classes.footer}>
      <span>
        Created by
        <a className={classes.link} href="https://github.com/nin3439">
          {' '}
          nin3439
        </a>{' '}
        2021
      </span>
      <a href="https://rs.school/">
        <img
          src="https://rs.school/images/rs_school.svg"
          alt="RSS Logo"
          className={classes.rssImage}
        />
      </a>
    </div>
  );
};

export default Footer;
