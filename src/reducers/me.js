import * as actions from '../constants/me';

const initialState = {
  uid: null,
  username: null,
  token: null,
  fetching: false
};

export default (state = initialState, action) => {
  const {type, payload = {}} = action;

  switch (type) {

  case actions.LOGIN_START:
    return {
      ...state,
      fetching: true
    };

  case actions.LOGIN:
    return {
      ...state,
      ...payload,
      fetching: false
    };

  case actions.LOGOUT:
    return {
      ...state,
      ...initialState
    };

  default:
    return state;
  }
};
