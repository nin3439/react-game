import { Link } from 'react-router-dom';
import { Button, IconButton, Grid, Box } from '@material-ui/core';
import { ArrowBackIos } from '@material-ui/icons';
import { levelsNumber } from '../../../../constants/levelsNumber';
import { useStyles } from './AllLevelsMaterialStyles';

const AllLevels = () => {
  const classMaterial: Record<'header' | 'link', string> = useStyles();
  return (
    <>
      <Box className={classMaterial.header}>
        <IconButton>
          <Link to="/">
            <ArrowBackIos />
          </Link>
        </IconButton>
        <Box>Прогресс %</Box>
      </Box>
      <Box>
        <Grid container justify="center" spacing={2}>
          {levelsNumber.map((value, index) => (
            <Grid key={value} item>
              <Link to={`/level/${index + 1}`} className={classMaterial.link}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classMaterial.link}
                >
                  {value}
                </Button>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
export default AllLevels;
