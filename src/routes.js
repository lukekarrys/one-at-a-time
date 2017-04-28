import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {UserAuthWrapper} from 'redux-auth-wrapper';
import qs from 'query-string';

import history from 'l/history';

import App from 'co/App';

import Home from 'p/Home';
import Start from 'p/Start';
import Story from 'p/Story';
import Stories from 'p/Stories';
import UserStories from 'p/UserStories';
import Login from 'p/Login';
import FourOhFour from 'p/FourOhFour';

const Auth = UserAuthWrapper({
  authSelector: (state) => state.me,
  authenticatingSelector: (state) => state.me.fetching,
  redirectAction: (location) => () => history.replace({
    pathname: location.pathname,
    search: qs.stringify(location.query)
  }),
  wrapperDisplayName: 'Auth'
});

export default class Routes extends React.Component {
  render() {
    return (
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />

          <Route exact path='/start' component={Auth(Start)} />
          <Route exact path='/start/public' component={Auth(Start)} />
          <Route exact path='/start/private' component={Auth(Start)} />

          <Route exact path='/stories' component={Stories} />
          <Route exact path='/stories/mine' component={Auth(UserStories)} />
          <Route exact path='/stories/:id' component={Auth(Story)} />

          <Route component={FourOhFour} />
        </Switch>
      </App>
    );
  }
}
