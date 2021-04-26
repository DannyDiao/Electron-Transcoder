import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TransferWithinAStationIcon from '@material-ui/icons/TransferWithinAStation';
import FormatListBulletedRoundedIcon from '@material-ui/icons/FormatListBulletedRounded';
import DoneIcon from '@material-ui/icons/Done';
import SettingsIcon from '@material-ui/icons/Settings';
import ArrowUpwardRoundedIcon from '@material-ui/icons/ArrowUpwardRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ActionType } from '../model/Interface';
const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}));

//生成带有导航链接的ListItem
function LinkListItem(props: any) {
  const { icon, primary, key, to, selected, onClick } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <li onClick={onClick}>
      <ListItem button component={CustomLink} key={key} selected={selected} >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function HomePageDrawer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(state => state)
  console.log('current_drawer_index:' + (state ? state.ui.current_drawer_index : ''));
  function changeDrawerIndexDispatch(index: number) {
    return dispatch({
      type: ActionType.ChangeDrawerIndex,
      payload: index
    })
  }

  function drawItemIsSelected(index: number) {
    return (state && state.ui) ? (state.ui.current_drawer_index === index) : false;
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant='permanent'
        classes={{
          paper: classes.drawerPaper
        }}
        anchor='left'
      >
        <Divider />
        <List>
          {/*抽屉导航栏上半部分*/}
          {LinkListItem({icon:<TransferWithinAStationIcon/>,primary:'转码',to:'/transcode',key:'transcode',onClick:() => changeDrawerIndexDispatch(1),selected:drawItemIsSelected(1)})}
          {LinkListItem({icon:<FormatListBulletedRoundedIcon/>,primary:'任务列表',to:'/task_list',key:'task_list',onClick:() => changeDrawerIndexDispatch(2),selected:drawItemIsSelected(2)})}
          {LinkListItem({icon:<DoneIcon/>,primary:'已完成',to:'/task_list_done',key:'task_list_done',onClick:() => changeDrawerIndexDispatch(3),selected:drawItemIsSelected(3)})}
          <Divider/>
          {/*抽屉导航栏下半部分*/}
          {LinkListItem({icon:<SettingsIcon/>,primary:'设置',to:'/setting',key:'setting',onClick:() => changeDrawerIndexDispatch(4),selected:drawItemIsSelected(4)})}
          {LinkListItem({icon:<ArrowUpwardRoundedIcon/>,primary:'检查更新',to:'/check_update',key:'check_update',onClick:() => changeDrawerIndexDispatch(5),selected:drawItemIsSelected(5)})}
          {LinkListItem({icon:<InfoRoundedIcon/>,primary:'关于',to:'/about',key:'about',onClick:() => changeDrawerIndexDispatch(6),selected:drawItemIsSelected(6)})}
        </List>
      </Drawer>
    </div>
  );


}


