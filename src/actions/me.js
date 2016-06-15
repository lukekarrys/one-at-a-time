import {auth as fbAuth, twitter as fbTwitter} from 'l/firebase';
import {replace} from 'react-router-redux';
import sillyname from 'sillyname';

import * as actions from '../constants/me';

const {localStorage} = window;

export const logout = () => (dispatch) => {
  fbAuth.signOut();
  localStorage.removeItem('anonymous_username');
  dispatch({type: actions.LOGOUT});
};

export const loginUser = (auth) => (dispatch, getState) => {
  if (!auth) {
    return dispatch(logout());
  }

  const {uid} = getState().me;

  if (uid) {
    return null;
  }

  const data = {
    uid: auth.uid
  };

  if (auth.isAnonymous) {
    const localUsername = localStorage.getItem('anonymous_username');
    data.username = localUsername || sillyname();
    data.avatar = `https://api.adorable.io/avatars/18/${data.uid.replace(/ /g, '')}`;
    localStorage.setItem('anonymous_username', data.username);
  }
  else {
    data.username = auth.providerData[0].displayName;
    data.avatar = auth.providerData[0].photoURL;
  }

  return dispatch({
    type: actions.LOGIN,
    payload: data
  });
};

export const login = ({type = 'anonymous', redirect} = {}) => (dispatch) => {
  dispatch({type: actions.LOGIN_START});

  const auth = type === 'anonymous'
    ? fbAuth.signInAnonymously()
    : fbAuth.signInWithPopup(fbTwitter);

  auth.then((result) => {
    // The main app.js file handles dispatching the loginUser action creator
    if (redirect) {
      dispatch(replace(redirect));
    }
  }).catch((err) => {
    dispatch(logout(err));
  });
};
