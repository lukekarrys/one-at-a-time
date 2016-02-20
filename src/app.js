import './styles/theme.less';
import '!!file?name=favicon.png!./favicon.png';
import '!!file?name=favicon.ico!./favicon.ico';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store/configureStore';
import routes from './routes';
import * as meActions from 'a/me';
import firebase from 'l/firebase';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

firebase.onAuth((auth) => store.dispatch(meActions.syncLogin(auth)));

ReactDOM.render((
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>
), document.getElementById('root'));
