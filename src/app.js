import './styles/theme.less';
import '!!file?name=favicon.png!./favicon.png';
import '!!file?name=favicon.ico!./favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import {once} from 'lodash';

import configureStore from './store/configureStore';
import routes from './routes';
import * as meActions from 'a/me';
import {auth} from 'l/firebase';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

store.dispatch(meActions.loginStart());
auth.onAuthStateChanged(once((user) => store.dispatch(meActions.loginUser(user))));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('root'));
