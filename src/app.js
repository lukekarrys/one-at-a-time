/* globals ga */

import './styles/theme.less';
import '!!file-loader?name=favicon.png!./favicon.png';
import '!!file-loader?name=favicon.ico!./favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {once} from 'lodash';
import {Router} from 'react-router-dom';

import history from 'l/history';
import * as meActions from 'a/me';
import {auth} from 'l/firebase';
import Routes from './routes';
import configureStore from './store/configureStore';

// eslint-disable-next-line no-console
const analytics = (process.env.NODE_ENV === 'production' ? ga : console.log);
const store = configureStore();

// Google analytics for each history change
const pageview = ({pathname, search}) => analytics('send', 'pageview', pathname + search);
history.listen(pageview);
pageview(history.location);

window.__history = history;

store.dispatch(meActions.loginStart());
auth.onAuthStateChanged(once((user) => store.dispatch(meActions.loginUser(user))));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
), document.getElementById('root'));
