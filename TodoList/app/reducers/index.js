import { combineReducers } from 'redux';
import todo from './todos';
import visibilityFilter from './visibilityFilter';

const reducer = combineReducers({
  todo,
  visibilityFilter,
});

export default reducer

