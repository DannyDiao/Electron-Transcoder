import React, { useEffect, useState } from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import {
  Button,
  createStyles,
  FormControl,
  InputLabel,
  MenuItem,
  Slider, Snackbar, TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ActionType } from '../../model/Interface';
import { useDispatch } from 'react-redux';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const ipcRenderer = require('electron').ipcRenderer;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(5),
      marginTop: theme.spacing(3)
    },
    single_line: {
      display: 'flex',
      alignItems: 'baseline',
      flexWrap: 'nowrap',
      justifyContent: 'start',
      marginBottom: 8
    },
    button: {
      margin: theme.spacing(1),
      width: 200,
      marginTop: -50
    }
  })
);
let setPath: Function;

ipcRenderer.on('save-path-selector-reply', function(event, args) {
  if (setPath) {
    setPath(args);
  }
});

export default function SelectParams() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [params, setParams] = React.useState({
    format: '',
    quality: 10,
    size: 'origin',
    fps: 'origin',
    only_sound: false,
    only_video: false,
    file_name: '',
    file_path: ''

  });

  const [open, setOpen] = useState(false);
  const [fileSavePath, setFileSavePath] = useState('');
  setPath = setFileSavePath;

  //改变转码步骤dispatch
  function changeStepDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeTranscodeStep,
      payload: index
    });
  }

  //存储转码参数dispatch
  function changeTranscodeParamsDispatch(payload) {
    return dispatch({
      type: ActionType.ChangeTranscodeParams,
      payload: payload
    });
  }

  const handleSnackBarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleSnackBarClick = () => {
    setOpen(true);
  };

  //渲染Alert
  function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant='filled' {...props} />;
  }

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, value: number, changeType: string) => {
    switch (changeType) {
      case 'format':
        setParams({
          ...params,
          format: event.target.value as string
        });
        break;
      case 'quality':
        setParams({
          ...params,
          quality: value
        });
        break;
      case 'size':
        setParams({
          ...params,
          size: event.target.value as string
        });
        break;
      case 'file_name':
        setParams({
          ...params,
          file_name: event.target.value as string
        });
        break;
      case 'file_path':
        setParams({
          ...params,
          file_path: event.target.value as string
        });
        break;
    }
  };

  const checkParamFinish = () => {
    return params.fps && params.format && params.size && params.quality && params.file_name;
  };

  //仅当fileSavePath变化时才会去做处理，避免过多的re-render
  useEffect(() => {
    //处理存储目录的变化
    handleChange({ target: { value: fileSavePath } } as React.ChangeEvent<{ value: unknown; }>, 0, 'file_path');
  },[fileSavePath])


  return (
    <div className={classes.root}>
      <div className={classes.container}>

        {/*选择格式*/}
        <div className={classes.single_line} style={{ marginBottom: 40 }}>
          <Typography>
            输出格式：
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel>格式</InputLabel>
            <Select
              value={params.format}
              onChange={(e) => handleChange(e, 0, 'format')}
            >
              <MenuItem value={'MP4'}>MP4</MenuItem>
              <MenuItem value={'FLV'}>FLV</MenuItem>
              <MenuItem value={'MOV'}>MOV</MenuItem>
              <MenuItem value={'M4V'}>M4V</MenuItem>
              <MenuItem value={'Webm'}>Webm</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/*选择质量*/}
        <div className={classes.single_line} style={{ alignItems: 'center' }}>
          <Typography style={{ minWidth: 90 }}>
            输出质量：
          </Typography>
          <Slider
            onChange={(e, value) => handleChange(e, value, 'quality')}
            style={{ minWidth: 200 }}
            defaultValue={10}
            aria-labelledby='discrete-slider'
            step={1}
            marks
            min={1}
            max={10}
            valueLabelDisplay='on'
          />
          <Typography variant={'body2'} style={{ marginLeft: 20, minWidth: 200 }}>
            (越大越接近原始质量)
          </Typography>
        </div>

        {/*输出尺寸*/}
        <div className={classes.single_line} style={{ marginBottom: 40 }}>
          <Typography>
            输出尺寸：
          </Typography>
          <FormControl className={classes.formControl}>
            <InputLabel>画面大小</InputLabel>
            <Select
              value={params.size}
              onChange={(e) => handleChange(e, 0, 'size')}
            >
              <MenuItem value={'origin'}>原始大小</MenuItem>
              <MenuItem value={'1440'}>2560x1440</MenuItem>
              <MenuItem value={'1080'}>1920x1080</MenuItem>
              <MenuItem value={'720'}>1280x720</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/*文件名*/}
        <div className={classes.single_line} style={{ marginBottom: 40 }}>
          <Typography>
            文件名：
          </Typography>
          <TextField label='文件名' variant='outlined' size='small' style={{ marginLeft: 24 }} onChange={(e) => {
            handleChange(e, 0, 'file_name');
          }} />
        </div>

        {/*输出位置*/}
        <div className={classes.single_line} style={{ marginBottom: 40 }}>
          <Typography>
            输出目录：
          </Typography>
          <TextField label='目录' value={fileSavePath} variant='outlined' size='small' style={{ marginLeft: 8 }}
                     onClick={() => {
                       ipcRenderer.send('save-path-selector', '');
                     }} />
        </div>

      </div>

      <Tooltip title={'下一步 - 核对参数&开始'}>
        <Button
          variant='contained'
          color='primary'
          className={classes.button}
          endIcon={<NavigateNextIcon />}
          onClick={() => {
            if (checkParamFinish()) {
              changeTranscodeParamsDispatch(params);
              ipcRenderer.send('transcode-params', params);
              changeStepDispatch(2);
            } else {
              handleSnackBarClick();
            }
          }}
        >
          下一步
        </Button>
      </Tooltip>

      <Snackbar open={open} autoHideDuration={3000} onClose={handleSnackBarClose}>
        <Alert onClose={handleSnackBarClose} severity='error'>
          参数还有未选择的
        </Alert>
      </Snackbar>
    </div>
  );
};
