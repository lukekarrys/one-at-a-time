import {combineReducers} from 'redux';

import stories from './stories';
import storiesList from './storiesList';
import me from './me';

export default combineReducers({
  stories,
  storiesList,
  me
});
