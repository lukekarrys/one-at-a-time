import {pick} from 'lodash';

import firebase from 'l/firebase';
import * as actions from '../constants/me';

export const syncLogin = (auth) => {
  if (!auth) {
    return syncLogout();
  }

  const {provider} = auth;
  let data;

  if (provider === 'anonymous') {
    data = {
      username: 'anonymous',
      id: auth.uid
    };
  }
  else if (provider === 'twitter') {
    data = pick(auth.twitter, 'username', 'id');
  }

  return {
    type: actions.LOGIN,
    auth: data
  };
};

export const syncLogout = () => ({
  type: actions.LOGOUT
});

export const loginTwitter = () => (dispatch) => {
  firebase.authWithOAuthPopup('twitter', (err, auth) => {
    if (err) {
      dispatch(syncLogout());
      return;
    }
    dispatch(syncLogin(auth));
  });
};

export const loginAnonymous = () => (dispatch) => {
  firebase.authAnonymously((err, auth) => {
    if (err) {
      dispatch(syncLogout());
      return;
    }
    dispatch(syncLogin(auth));
  });
};

export const logout = () => (dispatch) => {
  firebase.unauth();
  dispatch(syncLogout());
};
