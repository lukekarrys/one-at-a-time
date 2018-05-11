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

const store = configureStore();

store.dispatch(meActions.loginStart());
auth.onAuthStateChanged(once((user) => store.dispatch(meActions.authUser(user))));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Routes />
    </Router>
  </Provider>
), document.getElementById('root'));
