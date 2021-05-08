import React, { useState } from 'react';
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText, Snackbar } from '@material-ui/core';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import { useDispatch, useSelector } from 'react-redux';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import DoneIcon from '@material-ui/icons/Done';
import UndoIcon from '@material-ui/icons/Undo';
import DnsIcon from '@material-ui/icons/Dns';
import HighQualityIcon from '@material-ui/icons/HighQuality';
import { ActionType } from '../../model/Interface';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
const ipcRenderer = require('electron').ipcRenderer;
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default function CheckParams() {
  // @ts-ignore
  const transcode = useSelector(state => state.transcode);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    cleanAllDispatch('');
    changeStepDispatch(0);
  };

  //改变转码步骤dispatch
  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
    });
  }

  //添加任务dispatch
  function addTaskDispatch(task: any) {
    return dispatch({
      type: ActionType.AddTask,
      payload: task
    });
  }

  //清空所有参数dispatch
  function cleanAllDispatch(task: any) {
    return dispatch({
      type: ActionType.CleanTranscode,
      payload: task
    });
  }


  const listItemTextStyle = {
    marginLeft: -20,
    maxWidth: 100
  };

  const listItemStyle = {
    marginBottom: 1
  };

  const buttonStyle = {
    width: 200,
    marginTop: -50,
    marginLeft: 60
  };
  return (
    <div style={{ marginLeft: 40 }}>
      <List style={{ margin: 40, minWidth: 200, justifyContent: 'start' }}>
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary='核对参数...' style={listItemTextStyle} />
        </ListItem>
        <Divider variant='middle' style={{ marginTop: 10, marginBottom: 10 }} />
        {/*视频源文件*/}
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <VideoLibraryIcon />
          </ListItemIcon>
          <ListItemText primary='视频' style={listItemTextStyle} />
          <ListItemText secondary={transcode.metadata.format.filename.split('/').pop()} />
        </ListItem>
        {/*目标格式*/}
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <FileCopyIcon />
          </ListItemIcon>
          <ListItemText primary='目标格式' style={listItemTextStyle} />
          <ListItemText secondary={transcode.params.format} />
        </ListItem>
        {/*目标尺寸*/}
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <AspectRatioIcon />
          </ListItemIcon>
          <ListItemText primary='目标尺寸' style={listItemTextStyle} />
          <ListItemText secondary={transcode.params.size === 'origin' ? '保持不变' : transcode.params.size} />
        </ListItem>
        {/*目标质量*/}
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <HighQualityIcon />
          </ListItemIcon>
          <ListItemText primary='目标质量' style={listItemTextStyle} />
          <ListItemText secondary={transcode.params.quality * 10 + "%"} />
        </ListItem>
        {/*输出地址*/}
        <ListItem style={listItemStyle}>
          <ListItemIcon>
            <DnsIcon />
          </ListItemIcon>
          <ListItemText primary='输出地址' style={listItemTextStyle} />
          <ListItemText secondary={transcode.params.file_path + "/" + transcode.params.file_name + "." + transcode.params.format.toLowerCase()} />
        </ListItem>

        <ListItem style={{ marginTop: 60 }}>
          <Button
            variant='contained'
            color='primary'
            style={buttonStyle}
            startIcon={<DoneIcon />}
            onClick={() => {
              let timeStamp = new Date().getTime();
              let task = {
                id: timeStamp,
                name: transcode.metadata.format.filename.split('/').pop(),
                cover: transcode.coverImg
              };
              //添加到UI层redux
              addTaskDispatch(task);
              //添加到主进程tasks
              ipcRenderer.send('add-task', task);
              handleClickOpen();
            }}
          >
            OK,添加到任务列表
          </Button>

          <Button
            variant='outlined'
            color='primary'
            style={buttonStyle}
            startIcon={<UndoIcon />}
            onClick={() => {
              changeStepDispatch(1)
            }}
          >
            有误，返回更改
          </Button>
        </ListItem>
      </List>

      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>{"添加任务成功"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            您的转码任务已成功添加！
            请到任务列表查看。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color="primary" autoFocus>
            好的
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );


};
