import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {browserHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import reducer from '../reducers';

export default (initialState = {}) => {
  const middleware = [thunk, routerMiddleware(browserHistory)];
  const storeEnhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger')({
      collapsed: true
    }));
    storeEnhancers.push(
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
  }

  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...storeEnhancers
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
