import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { Box, Fab, Tooltip } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ActionType } from '../model/Interface';
import { useDispatch, useSelector } from 'react-redux';

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
  const state = useSelector(state => state);
  let currentDrawerIndex = (state && state.ui && state.ui.current_drawer_index) ? state.ui.current_drawer_index : 0;

  function changeDrawerIndexDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeDrawerIndex,
      payload: index
    });
  }

  return (
    <div>
      {
        currentDrawerIndex !== 0 &&
        <Tooltip title={'返回欢迎页'}>
          <Fab component={Link} to='/' className={classes.fab_button} color='primary' aria-label='add'
               onClick={() => changeDrawerIndexDispatch(0)}>
            <HomeIcon />
          </Fab>
        </Tooltip>
      }
    </div>
  );
};
