import React from 'react';
import { Button, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
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

export default function CheckParams() {
  const transcode = useSelector(state => state.transcode);
  const dispatch = useDispatch();

  //改变转码步骤dispatch
  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
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
  console.log(transcode.params.file_path);
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
    </div>
  );
};
