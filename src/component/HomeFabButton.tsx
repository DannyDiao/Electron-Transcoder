import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Fab } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ActionType } from '../model/Interface';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  fab_button: {
    position: 'absolute',
    right: 60,
    bottom: 60,
    color: 'primary'

  }
}));

export default function HomeFabButton() {
  const classes = useStyles();
  const dispatch = useDispatch();

  function changeDrawerIndexDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeDrawerIndex,
      payload: index
    })
  }

  return (
    <Fab component={Link} to='/' className={classes.fab_button} color='primary' aria-label='add' onClick={() => changeDrawerIndexDispatch(0)}>
      <HomeIcon />
    </Fab>
  )
};
