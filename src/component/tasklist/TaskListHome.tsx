import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Button, List, Paper, Typography } from '@material-ui/core';
import LinearProgress, { LinearProgressProps } from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import { ActionType } from '../../model/Interface';
import { getDispatch, setDispatch } from '../Static';
const {shell} = require('electron')
const os = require('os')
const ipcRenderer = require('electron').ipcRenderer;
import moment from 'moment';
import FileCopyIcon from '@material-ui/icons/FileCopy';
moment.locale('zh-cn');
import PlayArrowIcon from '@material-ui/icons/PlayArrow';



function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box display='flex' alignItems='center'>
      <Box width='100%' mr={1}>
        <LinearProgress variant='determinate' {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant='body2'
                    color='textSecondary'>{(Math.round(props.value) === 100 || Math.round(props.value) === 99) ? '完成' : Math.round(props.value) + '%'}</Typography>
      </Box>
    </Box>
  );
}

let dispatch: Function;

//改变task的dispatch
function modifyTaskDispatch(payload: any) {
  return dispatch({
    type: ActionType.ModifyTask,
    payload: payload
  });
}

//改变task的dispatch
function modifyStartDispatch(payload: any) {
  return dispatch({
    type: ActionType.ModifyTask,
    payload: payload
  });
}

ipcRenderer.on('transcode-progress', function(event, args) {
  modifyTaskDispatch(args);
});

ipcRenderer.on('transcode-end', function(event, args) {
  modifyTaskDispatch(args);
});


export default function TaskListHome() {
  const state = useSelector(state => state);
  let tasks = state.tasks;
  if (dispatch === undefined) {
    dispatch = getDispatch();
  }

  const [start, setStart] = useState([]);

  const paperStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 800,
    maxHeight: 600,
    minHeight: 600,
    overflow: 'auto'
  };
  const cardStyle = {
    marginLeft: 20,
    marginBottom: 20,
    width: 700,
    height: 80
  };
  const cardContentStyle = {
    display: 'flex',
    width: 700,
    height: 80,
    alignItems: 'center'

  };
  tasks = tasks.sort((a, b) => a.id - b.id);
  const taskList = tasks.map((item, index) => {
    return (
      <Card key={item.id} style={cardStyle}>
        <CardContent style={cardContentStyle}>
          <img src={item.cover} style={{ width: 60, height: 60, borderRadius: 6 }} />
          <div
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', height: 60, marginLeft: 10 }}>
            <Typography variant='body1' style={{ marginBottom: 4 }}>
              {item.name}
            </Typography>
            <Typography variant='body2' style={{}}>
              {moment(item.id).format('YYYY/MM/DD hh:mm:ss')}
            </Typography>
            <LinearProgressWithLabel style={{ width: 400, height: 5 }}
                                     value={item.progress ? parseFloat(item.progress) : 0} />
          </div>
          {
            item.isEnd ?
              <Button
                style={{ marginLeft: 15 }}
                variant='contained'
                color='primary'
                startIcon={<FileCopyIcon />}
                onClick={() => {
                  shell.showItemInFolder(item.outputDir[0]);
                }}>
                浏览文件...
              </Button>
              :
              <Button
                style={{ marginLeft: 15 }}
                variant='contained'
                color='primary'
                disabled={item.isStart ? item.isStart : false}
                startIcon={<PlayArrowIcon />}
                onClick={() => {
                  modifyStartDispatch({ id: item.id, isStart: true });
                  ipcRenderer.send('start-transcode', item.id);
                }}>
                开始
              </Button>
          }

        </CardContent>
      </Card>
    );
  });
  return (
    <Paper style={paperStyle}>
      <Typography variant='h5' style={{ marginTop: 20, marginBottom: 20 }}>
        任务列表
      </Typography>
      <List>
        {
          tasks.length > 0 ? taskList : <Typography>列表空空如也...</Typography>
        }
      </List>
    </Paper>
  );

}
