import * as actions from '../constants/stories';

const initialState = {
};

export default (state = initialState, action) => {
  const {type, payload} = action;
  const {id, data} = payload || {};

  switch (type) {

  case actions.JOINING:
    return {
      ...state,
      [id]: {
        ...state[id],
        joining: true,
        data: []
      }
    };

  case actions.RECEIVE_DATA:
    return {
      ...state,
      [id]: {
        ...state[id],
        joining: false,
        data: data || []
      }
    };

  case actions.APPEND_DATA:
    return {
      ...state,
      [id]: {
        ...state[id],
        joining: false,
        data: [
          ...(state[id].data || []),
          data
        ]
      }
    };

  default:
    return state;

  }
};
