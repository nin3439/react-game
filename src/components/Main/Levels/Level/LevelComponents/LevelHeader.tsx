import React from 'react';
import { IconButton, Box, Typography, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Home } from '@material-ui/icons/';

export const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
  },
}));

interface ILevelProps {
  id: number;
}

export const LevelHeader: React.FC<ILevelProps> = ({ id }) => {
  const classMaterial: Record<'header', string> = useStyles();
  return (
    <Box className={classMaterial.header}>
      <Typography> Уровень {id} </Typography>
      <IconButton>
        <Link to="/level">
          <Home />
        </Link>
      </IconButton>
    </Box>
  );
};
