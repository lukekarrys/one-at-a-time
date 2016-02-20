import firebase from 'l/firebase';
import {replace} from 'react-router-redux';
import sillyname from 'sillyname';

import * as actions from '../constants/me';

const {localStorage} = window;

export const syncLogin = (auth) => {
  if (!auth) {
    return syncLogout();
  }

  const {provider} = auth;

  const data = {
    token: auth.token,
    uid: auth.uid,
    provider: auth.provider
  };

  if (provider === 'anonymous') {
    const localUsername = localStorage.getItem('anonymous_username');
    data.username = localUsername || sillyname();
    data.avatar = `https://avatars.discourse.org/v2/letter/${data.username.charAt(0)}/18BC9C/18.png`;
    localStorage.setItem('anonymous_username', data.username);
  }
  else if (provider === 'twitter') {
    data.username = auth.twitter.username;
    data.avatar = auth.twitter.profileImageURL;
  }

  return {
    type: actions.LOGIN,
    payload: data
  };
};

export const syncLogout = () => {
  localStorage.removeItem('anonymous_username');
  return {type: actions.LOGOUT};
};

export const login = ({type = 'anonymous', redirect} = {}) => (dispatch) => {
  const action = type === 'anonymous'
    ? (cb) => firebase.authAnonymously(cb)
    : (cb) => firebase.authWithOAuthPopup(type, cb);

  action((err, auth) => {
    if (err) {
      dispatch(syncLogout());
      return;
    }
    // dispatch(syncLogin(auth));
    if (redirect) {
      dispatch(replace(redirect));
    }
  });
};

export const logout = () => (dispatch) => {
  firebase.unauth();
  dispatch(syncLogout());
};
