import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, CardActions, CardContent, CardMedia, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card/Card';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import RefreshIcon from '@material-ui/icons/Refresh';
import {Link} from 'react-router-dom';
import flower_image from '../img/flower_spring.jpg';
import flower_image_2 from '../img/flower_spring_2.jpg';
import flower_image_3 from '../img/flower_spring_3.jpg';
import flower_image_4 from '../img/flower_spring_4.jpg';

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
  const [image, setImage] = useState(flower_image);
  let imageArray = [flower_image, flower_image_2, flower_image_3, flower_image_4];
  return (
    <Card className={classes.empty_view}>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="380"
          image={image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2" className={classes.title}>
            欢迎！
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p">
            新建转码任务，请点击"转码"
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
        <Button
          onClick={()=> {
          let randomIndex = Math.floor(Math.random() * imageArray.length);
          setImage(imageArray[randomIndex])
          }}
          startIcon={<RefreshIcon/>} className={classes.button} disableElevation size="medium" color="primary">
          换个背景？
        </Button>
      </CardActions>
    </Card>
  );

}

