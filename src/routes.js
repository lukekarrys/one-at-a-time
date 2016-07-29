import React from 'react';
import {Route, IndexRoute} from 'react-router';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import {routerActions} from 'react-router-redux';

import App from 'co/App';

import Home from 'p/Home';
import Start from 'p/Start';
import Story from 'p/Story';
import Stories from 'p/Stories';
import UserStories from 'p/UserStories';
import Login from 'p/Login';
import FourOhFour from 'p/FourOhFour';

const Auth = UserAuthWrapper({
  authSelector: (state) => state.me.id,
  authenticatingSelector: (state) => state.me.fetching,
  redirectAction: routerActions.replace,
  wrapperDisplayName: 'Auth'
});

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='login' component={Login} />

    <Route path='start'>
      <IndexRoute component={Auth(Start)} />
      <Route path='public' component={Auth(Start)} />
      <Route path='private' component={Auth(Start)} />
    </Route>

    <Route path='stories'>
      <IndexRoute component={Stories} />
      <Route path='mine' component={Auth(UserStories)} />
      <Route path=':id' component={Auth(Story)} />
    </Route>

    <Route path='*' component={FourOhFour} />
  </Route>
);
