import {replace} from 'react-router-redux';
import {after, last} from 'lodash';
import * as actions from '../constants/stories';
import fb from 'l/firebase';

export const addItem = (item) => ({
  type: actions.ADD_ITEM,
  payload: item
});

export const create = ({name, type = 'private'}) => (dispatch) => {
  const ref = fb.child('stories').push({type, name});
  dispatch(replace(`/stories/${ref.key()}`));
};

export const join = (id) => (dispatch, getState) => {
  const {me} = getState();

  if (!me.id) {
    return dispatch({type: 'AUTH'});
  }

  dispatch({type: actions.JOINING, payload: {id}});

  const storyRef = fb.child(`stories/${id}`);
  const dataRef = fb.child(`storyData/${id}`);

  const onChildAdded = (snapshot) => dispatch({
    type: actions.APPEND_DATA,
    payload: {
      id,
      data: {
        id: snapshot.key(),
        ...snapshot.val()
      }
    }
  });

  let query;
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
      query = dataRef
        .orderByKey()
        .startAt(last(keys))
        .on('child_added', after(2, onChildAdded));
    }
    else {
      query = dataRef.on('child_added', onChildAdded);
    }
  };

  dataRef.once('value', onValue);
  storyRef.once('value', (snapshot) => {
    dispatch({
      type: actions.UPDATE_STORY,
      payload: {
        id,
        ...snapshot.val()
      }
    });
  });

  return () => {
    dataRef.off('child_added', query);
  };
};

export const add = ({id, item}) => (dispatch, getState) => {
  const {me} = getState();

  if (!me.id) {
    return dispatch({type: 'AUTH'});
  }

  return fb.child(`storyData/${id}`).push(item);
};
