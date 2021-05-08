import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.global.css';
import HomePageDrawer from './component/Drawer';
import EmptyView from './component/EmptyView';
import TranscodeHome from './component/transcode/TranscodeHome';
import TaskListHome from './component/tasklist/TaskListHome';
import TaskDoneHome from './component/taskdone/TaskDoneHome';
import SettingHome from './component/setting/SettingHome';
import CheckUpdateHome from './component/checkupdate/CheckUpdateHome';
import AboutHome from './component/about/AboutHome';
import { Box, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createStore } from 'redux';
import Reducer from './model/Reducer';
import { Provider } from 'react-redux';
import HomeFabButton from './component/HomeFabButton';

const initialState = {
  ui: {
    current_drawer_index: 0 //drawer的当前index
  },
  transcode: {
    current_step: 0, //转码-步骤条的当前步骤
    is_source_file_selected: false,
    coverImg: '',
    params: {}
  },
  tasks: []
};

// @ts-ignore
let store = createStore(Reducer, initialState);

export default function App() {

  return (
    <div>
      <Provider store={store}>
        <Router>
          <Box style={{ display: 'flex', flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <HomeFabButton/>
          </Box>
        </Router>
      </Provider>
    </div>
  );
}
