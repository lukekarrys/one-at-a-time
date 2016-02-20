import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App';
import Home from './pages/Home';
import Create from './pages/Create';
import Join from './pages/Join';
import Story from './pages/Story';
import Stories from './pages/Stories';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='create' component={Create} />

    <Route path='create'>
      <IndexRoute component={Create} />
      <Route path='public' component={Create} />
      <Route path='private' component={Create} />
    </Route>

    <Route path='stories'>
      <IndexRoute component={Stories} />
      <Route path='join' component={Join} />
      <Route path=':id' component={Story} />
    </Route>
  </Route>
);
