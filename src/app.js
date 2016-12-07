/* globals ga */

import './styles/theme.less';
import '!!file?name=favicon.png!./favicon.png';
import '!!file?name=favicon.ico!./favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {once} from 'lodash';

import * as meActions from 'a/me';
import {auth} from 'l/firebase';
import configureStore from './store/configureStore';
import routes from './routes';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

// Google analytics for each history change
// Use getCurrentLocation since first call has no location https://github.com/reactjs/react-router-redux/issues/475
const pageview = ({pathname, search}) => ga('send', 'pageview', pathname + search);
history.listen((location) => pageview(location || history.getCurrentLocation()));

store.dispatch(meActions.loginStart());
auth.onAuthStateChanged(once((user) => store.dispatch(meActions.loginUser(user))));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('root'));
