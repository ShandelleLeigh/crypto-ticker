import { combineReducers } from 'redux';
import user from './user';
import flash from './flash';
import coins from './coins';

//will have coins reducer, so add to list of reducers, and imports,
//make file of coins.js reducer
const rootReducer = combineReducers({
  user,
  flash,
  coins,
});

export default rootReducer;
