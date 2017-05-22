import sillyname from 'sillyname';
import {auth as fbAuth, twitter as fbTwitter} from 'l/firebase';
import history from 'l/history';

import * as actions from '../constants/me';

const {localStorage} = window;

export const loginStart = () => ({
  type: actions.LOGIN_START
});

export const logout = (error) => (dispatch) => {
  fbAuth.signOut();
  localStorage.removeItem('anonymous_username');
  dispatch({type: actions.LOGOUT, error});
};

export const authUser = (user) => (dispatch, getState) => {
  if (!user) {
    return dispatch(logout(new Error('No authentication information')));
  }

  const {uid} = getState().me;

  if (uid) {
    return null;
  }

  const data = {
    uid: user.uid
  };

  if (user.isAnonymous) {
    const localUsername = localStorage.getItem('anonymous_username');
    data.username = localUsername || sillyname();
    data.avatar = `https://api.adorable.io/avatars/18/${data.uid.replace(/ /g, '')}`;
    localStorage.setItem('anonymous_username', data.username);
  }
  else {
    data.username = user.providerData[0].displayName;
    data.avatar = user.providerData[0].photoURL;
  }

  return dispatch({
    type: actions.LOGIN,
    payload: data
  });
};

export const login = ({type = 'anonymous', redirect} = {}) => (dispatch) => {
  dispatch(loginStart());

  const auth = type === 'anonymous'
    ? fbAuth.signInAnonymously()
    : fbAuth.signInWithPopup(fbTwitter);

  auth.then((result) => {
    dispatch(authUser(result.user || result));
    if (redirect) return history.replace(redirect);
    return null;
  }).catch((err) => {
    dispatch(logout(err));
  });
};
