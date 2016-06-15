import {replace} from 'react-router-redux';
import {after, last} from 'lodash';

import {LOGOUT} from '../constants/me';
import * as actions from '../constants/stories';
import fb from 'l/firebase';

export const addItem = (item) => ({
  type: actions.ADD_ITEM,
  payload: item
});

export const start = ({name, uid, type = 'private', forceSharing = true}) => (dispatch) => {
  const ref = fb.child('stories').push({type, name, uid, forceSharing});
  dispatch(replace(`/stories/${ref.key}`));
};

export const fetch = (id) => (dispatch, getState) => {
  const {me} = getState();

  if (!me.uid) {
    return dispatch({type: LOGOUT});
  }

  dispatch({type: actions.FETCH_START, payload: {id}});

  const storyRef = fb.child(`stories/${id}`);
  const query = storyRef.on('value', (snapshot) => {
    const val = snapshot.val();

    if (val === null) {
      dispatch({
        type: actions.FETCH_ERROR,
        payload: {
          id,
          error: 'That story does not exist'
        }
      });
      return;
    }

    dispatch({
      type: actions.FETCH_SUCCESS,
      payload: {
        id,
        ...val
      }
    });
  });

  return () => {
    storyRef.off('value', query);
  };
};

export const join = (id) => (dispatch, getState) => {
  const {me} = getState();

  if (!me.uid) {
    return dispatch({type: LOGOUT});
  }

  dispatch({type: actions.JOINING, payload: {id}});

  let query;
  const ref = fb.child(`storyData/${id}`);
  const onChildAdded = (snapshot) => dispatch({
    type: actions.APPEND_DATA,
    payload: {
      id,
      data: {
        id: snapshot.key,
        ...snapshot.val()
      }
    }
  });
  const onValue = (snapshot) => {
    const data = snapshot.val() || {};
    const keys = Object.keys(data);
    dispatch({
      type: actions.RECEIVE_DATA,
      payload: {
        id,
        data: keys.map((key) => ({id: key, ...data[key]}))
      }
    });

    if (keys.length) {
      query = ref
        .orderByKey()
        .startAt(last(keys))
        .on('child_added', after(2, onChildAdded));
    }
    else {
      query = ref.on('child_added', onChildAdded);
    }
  };

  ref.once('value', onValue);

  return () => {
    ref.off('child_added', query);
  };
};

export const add = ({id, item}) => (dispatch, getState) => {
  const {me} = getState();

  if (me.uid) {
    fb.child(`storyData/${id}`).push({
      ...item,
      user: {
        uid: me.uid,
        username: me.username
      }
    });
  }
};
