import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  Card,
  createStyles, Icon, Tooltip
} from '@material-ui/core';
import { Add } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../../model/Interface';

const ipcRenderer = require('electron').ipcRenderer;

const remote = require('electron').remote;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
    },
    left_content: {
      marginTop: 100,
      display: 'flex',
      justifyContent: 'center',
      width: 375,
      height: 500
    },
    select_source: {
      width: 150,
      height: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fdfdfd',
      marginTop: 15
    },
    add_icon: {
      width: 70,
      height: 70
    },
    right_content: {
      marginTop: 50,
      width: 375,
      height: 500
    },
    params_root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper
    },
    inline: {
      display: 'inline'
    },
    button: {
      margin: theme.spacing(1),
      marginTop: 80
    },
    file_name: {
      marginTop: 40
    }
  })
);

export default function SelectSource() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state);

  //改变转码步骤dispatch
  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
    });
  }

  //改变源文件metadata dispatch
  function changeMetadataDispatch(metadata: any) {
    return dispatch({
      type: ActionType.changeMetadata,
      payload: metadata
    });
  }

  //改变选择源文件状态 dispatch
  function changeFileSelectedDispatch(status: any) {
    return dispatch({
      type: ActionType.ChangeFileSelected,
      payload: status
    });
  }

  ipcRenderer.on('open-file-selector-reply', function(event, args) {
    console.log('file_path_reply', args);
  });

  ipcRenderer.on('open-file-selector-metadata-reply', function(event, args) {
    console.log('open-file-selector-metadata-reply');
    console.log('metadata_reply', args);
    changeMetadataDispatch(args);
    // changeFileSelectedDispatch(true);
  });
  // let codecName;
  //
  // if (state && state.transcode && state.transcode.metadata && state.transcode.metadata.streams) {
  //   codecName = state.transcode.metadata.streams.find((stream) => {
  //     stream
  //   });

  // }
  function handleFileSize(size) {
    let numSize = parseInt(size);
    numSize = numSize / 1000;
    if (numSize >= 1000) {
      return (numSize / 1000).toFixed(2) + ' MB';
    } else {
      return numSize.toFixed(2) + ' KB';
    }
  }

  function handleBitRate(size) {
    let numSize = parseInt(size);
    numSize = numSize / 1000;
    if (numSize >= 1000) {
      return (numSize / 1000).toFixed(2) + ' Mb/s';
    } else {
      return numSize.toFixed(2) + ' Kb/s';
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.left_content}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant='h5'>
            选择源文件
          </Typography>
          <Tooltip title={'选择需要转码的文件'}>
            <Card className={classes.select_source} onClick={() => {
              ipcRenderer.send('open-file-selector', '');
            }}>
              <Add color='primary' className={classes.add_icon} />
            </Card>
          </Tooltip>
          <Typography className={classes.file_name}>
            {
              state &&
              state.transcode &&
              state.transcode.metadata &&
              state.transcode.metadata.format.filename.split('/').pop()
            }
          </Typography>
        </div>
      </div>
      <div className={classes.right_content}>
        <List className={classes.params_root}>
          {/*文件大小*/}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='文件大小'
              secondary={
                <React.Fragment>
                  {
                    state &&
                    state.transcode &&
                    state.transcode.metadata &&
                    handleFileSize(state.transcode.metadata.format.size)
                  }
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant='middle' component='li' />
          {/*封装格式*/}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='封装格式'
              secondary={
                <React.Fragment>
                  {
                    state &&
                    state.transcode &&
                    state.transcode.metadata &&
                    state.transcode.metadata.format.filename.split('.')[1]
                  }
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant='middle' component='li' />
          {/*编码格式*/}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='编码格式'
              secondary={
                <React.Fragment>
                  {
                    state &&
                    state.transcode &&
                    state.transcode.metadata &&
                    state.transcode.metadata.streams.find((stream) => {
                      return stream.codec_type === 'video';
                    }).codec_name
                  }
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant='middle' component='li' />
          {/*码率*/}
          <ListItem alignItems='flex-start'>
            <ListItemText
              primary='码率'
              secondary={
                <React.Fragment>
                  {
                    state &&
                    state.transcode &&
                    state.transcode.metadata &&
                    handleBitRate(state.transcode.metadata.format.bit_rate)
                  }
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
        <Tooltip title={'下一步 - 选择转码参数'}>
          <Button
            variant='contained'
            color='primary'
            className={classes.button}
            endIcon={<NavigateNextIcon />}
            onClick={() => changeStepDispatch(1)}
          >
            下一步
          </Button>
        </Tooltip>
      </div>


    </div>
  );
};
