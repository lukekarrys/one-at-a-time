import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

export default function configureStore(initialState = {}) {
  const middleware = [thunk];
  const storeEnhancers = [];

  if (process.env.NODE_ENV !== 'production') {
    middleware.push(require('redux-logger')());
    storeEnhancers.push(
      window.devToolsExtension ? window.devToolsExtension() : (f) => f
    );
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...storeEnhancers
    )
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
