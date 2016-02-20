import * as actions from '../constants/storiesList';
import fb from 'l/firebase';

export const fetch = (id) => (dispatch, getState) => {
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

export const add = ({id, item}) => (dispatch, getState) => {
  const {me} = getState();

  if (me.token) {
    fb.child(`storyData/${id}`).push({
      ...item,
      user: {
        uid: me.uid,
        username: me.username
      }
    });
  }
};
