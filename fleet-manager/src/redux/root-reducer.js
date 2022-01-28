// Redux Imports
import { combineReducers } from 'redux';

// Reducer Import
import starshipReducers from './starship/starship.reducer';

const rootReducer = combineReducers({
  starship: starshipReducers,
});

export default rootReducer;