import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';

import stories from './stories';
import me from './me';

export default combineReducers({
  stories,
  me,
  routing
});
