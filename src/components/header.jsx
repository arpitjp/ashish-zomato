import React from 'react';
import { Typography } from "@material-ui/core"
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  heading: { fontSize: '48px', margin: '24px' },
  description: { fontSize: '20px', marginBottom: '30px' }
}));

export const Header = () => {
  const classes = useStyles();
  return <>
    <Typography align="center" variant="h1" className={classes.heading}>Finding Falcone!</Typography>
    <Typography align="center" variant="body1" className={classes.description}>Select planets you want to search in:</Typography>
  </>
}