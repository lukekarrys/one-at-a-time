import * as actions from '../constants/story';

export const addItem = (item) => ({
  type: actions.ADD_ITEM,
  payload: item
});
