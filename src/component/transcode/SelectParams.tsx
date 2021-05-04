import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { createStyles, FormControl, InputLabel, MenuItem, Slider, Typography } from '@material-ui/core';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex'
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
      alignItems:'baseline',
      flexWrap:'nowrap',
      justifyContent:'start',
      marginBottom: 15
    }
  })
);

export default function SelectParams() {
  const classes = useStyles();
  const [params, setParams] = React.useState({
    format: '',
    quality: 10,
    size: 'origin',
    fps:'origin',
    only_sound: false,
    only_video: false
  });

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>, value: number, changeType: string) => {

    console.log(event.target.value);
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
        })
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>

        {/*选择格式*/}
        <div className={classes.single_line} style={{marginBottom:40}}>
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
              <MenuItem value={'RMVB'}>RMVB</MenuItem>
              <MenuItem value={'MOV'}>MOV</MenuItem>
              <MenuItem value={'MKV'}>MKV</MenuItem>
              <MenuItem value={'AVI'}>AVI</MenuItem>
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
            defaultValue={5}
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
        <div className={classes.single_line} style={{marginBottom:40}}>
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
      </div>
    </div>
  );
};
