import {LOGIN, LOGOUT} from '../constants/me';

const initialState = {
  uid: null,
  username: null,
  token: null
};

export default (state = initialState, action) => {
  const {type, payload = {}} = action;

  switch (type) {

  case LOGIN:
    return {
      ...state,
      ...payload
    };

  case LOGOUT:
    return {
      ...state,
      ...initialState
    };

  default:
    return state;
  }
};
