import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import HomePageDrawer from './component/Drawer';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePageDrawer} />
      </Switch>
    </Router>
  );
}
