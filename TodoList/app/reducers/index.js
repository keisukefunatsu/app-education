import { combineReducers } from 'redux';
import todos from './todos';
import visibilityFilter from './visibilityFilter';

export const combinedReducer = combineReducers({
  todos,
  visibilityFilter,
});
