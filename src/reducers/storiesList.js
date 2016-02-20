import * as actions from '../constants/storiesList';

const initialState = {
  fetching: false,
  records: []
};

export default (state = initialState, action) => {
  const {type, payload = {}} = action;

  switch (type) {

  case actions.FETCH_START:
    return {
      ...state,
      fetching: true
    };

  case actions.FETCH_SUCCESS:
    return {
      ...state,
      fetching: false,
      records: payload.records
    };

  default:
    return state;

  }
};
