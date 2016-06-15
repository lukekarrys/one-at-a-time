import * as actions from '../constants/storiesList';
import fb from 'l/firebase';
import {LOGOUT} from '../constants/me';

export const fetch = () => (dispatch, getState) => {
  dispatch({type: actions.FETCH_START});

  const storiesRef = fb.child('stories');

  const onValue = (snapshot) => {
    const data = snapshot.val() || {};
    const keys = Object.keys(data);
    dispatch({
      type: actions.FETCH_SUCCESS,
      payload: {
        records: keys.map((key) => ({id: key, ...data[key]}))
      }
    });
  };

  const query = storiesRef
    .orderByChild('type')
    .equalTo('public')
    .on('value', onValue);

  return () => {
    storiesRef.off('value', query);
  };
};

export const fetchMine = () => (dispatch, getState) => {
  const {me} = getState();

  if (!me.uid) {
    dispatch({type: LOGOUT});
    return () => {};
  }

  dispatch({type: actions.FETCH_START});

  const storiesRef = fb.child('stories');

  const onValue = (snapshot) => {
    const data = snapshot.val() || {};
    const keys = Object.keys(data);
    dispatch({
      type: actions.FETCH_SUCCESS,
      payload: {
        records: keys.map((key) => ({id: key, ...data[key]}))
      }
    });
  };

  const query = storiesRef
    .orderByChild('uid')
    .equalTo(me.uid)
    .on('value', onValue);

  return () => {
    storiesRef.off('value', query);
  };
};
