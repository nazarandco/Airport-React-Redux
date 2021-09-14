import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Direction from '../direction/Direction.jsx';

const Scoreboard = () => (
  <div className='scoreboard'>
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Direction} />
        <Route path='/:direction' component={Direction} />
      </Switch>
    </BrowserRouter>
  </div>
);

export default Scoreboard;
