import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card/Card';
import Box from '@material-ui/core/Box/Box';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  empty_view: {
    width:750,
    height:600,
  },
  button:{
    margin: theme.spacing(1),
    fontSize:'medium'
  },
  title:{
  }
}));
const randomPicSrc = 'https://source.unsplash.com/user/maripopeo';

export default function EmptyView() {
  const classes = useStyles();

  return (
    <Card className={classes.empty_view}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="380"
          image={randomPicSrc}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
            欢迎！
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            新建转码任务，请点击"转码"!
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            ____
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          Electron Transcoder V0.0.1-alpha
          </Typography>
        </CardContent>
      <CardActions>
        <Button component={Link} to="/transcode" startIcon={<TransferWithinAStationIcon/>} className={classes.button} disableElevation size="medium" color="primary">
          转码
        </Button>
        <Button component={Link} to="/task_list" startIcon={<FormatListBulletedRoundedIcon/>} className={classes.button} disableElevation size="medium" color="primary">
          任务列表
        </Button>
      </CardActions>
    </Card>
  );

}

