import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import HomePageDrawer from './component/Drawer';
import EmptyView from './component/EmptyView';
import TranscodeHome from './component/transcode/TranscodeHome';
import TaskListHome from './component/tasklist/TaskListHome';
import TaskDoneHome from './component/taskdone/TaskDoneHome';
import SettingHome from './component/setting/SettingHome';
import CheckUpdateHome from './component/checkupdate/CheckUpdateHome';
import AboutHome from './component/about/AboutHome';
import { Box } from '@material-ui/core';


export default function App() {
  return (
    <div>
      <Router>
        <Box style={{ display:'flex',flex: 1, flexDirection:'row',justifyContent:'space-between'}}>
          <HomePageDrawer />
          <Switch>
            <Route path='/transcode' component={TranscodeHome} />
            <Route path='/task_list' component={TaskListHome} />
            <Route path='/task_list_done' component={TaskDoneHome} />
            <Route path='/setting' component={SettingHome} />
            <Route path='/check_update' component={CheckUpdateHome} />
            <Route path='/about' component={AboutHome} />
            <Route path='/' component={EmptyView} />
          </Switch>
        </Box>
      </Router>
    </div>
  );
}
