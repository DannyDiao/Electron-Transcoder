import React from 'react';
import { Fab } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent:'flex-end'
  }
}));

export default function AboutHome(){
  const classes = useStyles();
    return (
      <div className={classes.container}>
        <h1>AboutHome!</h1>
      </div>
    );
}
