import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import HomePageDrawer from './component/Drawer';
import EmptyView from './component/EmptyView';
import TranscodeHome from './component/transcode/TranscodeHome';
import TaskListHome from './component/tasklist/TaskListHome';
import TaskDoneHome from './component/taskdone/TaskDoneHome';


export default function App() {
  return (
    <div style={{ flex: 'auto', justifyContent: 'start' }}>
      <Router>
        <div>
          <HomePageDrawer />
          <Switch>
            <Route path='/transcode' component={TranscodeHome} />
            <Route path='/task_list' component={TaskListHome} />
            <Route path='/task_list_done' component={TaskDoneHome} />
            <Route path='/' component={EmptyView} />

          </Switch>
        </div>
      </Router>
    </div>
  );
}
