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
  const { icon, primary, key, to } = props;

  const CustomLink = React.useMemo(
    () =>
      React.forwardRef((linkProps, ref) => (
        <Link ref={ref} to={to} {...linkProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={CustomLink} key={key}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

export default function HomePageDrawer() {
  const classes = useStyles();

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
          {LinkListItem({icon:<TransferWithinAStationIcon/>,primary:'转码',to:'/transcode',key:'transcode'})}
          {LinkListItem({icon:<FormatListBulletedRoundedIcon/>,primary:'任务列表',to:'/task_list',key:'task_list'})}
          {LinkListItem({icon:<DoneIcon/>,primary:'已完成',to:'/task_list_done',key:'task_list_done'})}
          <Divider/>
          {/*抽屉导航栏下半部分*/}
          {LinkListItem({icon:<SettingsIcon/>,primary:'设置',to:'/setting',key:'setting'})}
          {LinkListItem({icon:<ArrowUpwardRoundedIcon/>,primary:'检查更新',to:'/check_update',key:'check_update'})}
          {LinkListItem({icon:<InfoRoundedIcon/>,primary:'关于',to:'/about',key:'about'})}
        </List>
      </Drawer>
    </div>
  );
}
