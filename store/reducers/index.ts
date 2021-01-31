import { combineReducers } from 'redux';

import candidateReducer from 'store/reducers/candidate';

const rootReducer = combineReducers({
  candidateReducer,
});

export default rootReducer;
