import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Auth from 'co/Auth';
import App from 'co/App';

import Home from 'p/Home';
import Start from 'p/Start';
import Story from 'p/Story';
import Stories from 'p/Stories';
import UserStories from 'p/UserStories';
import Login from 'p/Login';
import FourOhFour from 'p/FourOhFour';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />

    <Route path='Start' component={Auth()}>
      <IndexRoute component={Start} />
      <Route path='public' component={Start} />
      <Route path='private' component={Start} />
    </Route>

    <Route path='stories'>
      <IndexRoute component={Stories} />
      <Route component={Auth()}>
        <Route path='mine' component={UserStories} />
        <Route path=':id' component={Story} />
      </Route>
    </Route>

    <Route path='*' component={FourOhFour} />
  </Route>
);
