import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Auth from 'co/Auth';
import App from 'co/App';

import Home from 'p/Home';
import Create from 'p/Create';
import Story from 'p/Story';
import Stories from 'p/Stories';
import Login from 'p/Login';
import FourOhFour from 'p/FourOhFour';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />

    <Route path='create' component={Auth()}>
      <IndexRoute component={Create} />
      <Route path='public' component={Create} />
      <Route path='private' component={Create} />
    </Route>

    <Route path='stories'>
      <IndexRoute component={Stories} />
      <Route component={Auth()}>
        <Route path=':id' component={Story} />
      </Route>
    </Route>

    <Route path='*' component={FourOhFour} />
  </Route>
);
