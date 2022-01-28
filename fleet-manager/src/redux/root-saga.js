// Saga Imports
import { all, call } from 'redux-saga/effects';
import { starshipSagas } from './starship/starship.sagas';

// Root Saga
export function* rootSaga() {
  yield all([
    call(starshipSagas)
  ]);
}