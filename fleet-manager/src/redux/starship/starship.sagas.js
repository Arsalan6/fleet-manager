import { all, call, put, takeLatest } from 'redux-saga/effects';
import starshipService from '../../services/starship_service'
import starshipActionTypes from "./starship.types";
import { fetchStarShipListFailure, fetchStarShipListSuccess } from './starship.actions';

export function* fetchStarshipList({ payload: { searchParam } }) {
  try {
    const starshipList = yield starshipService.getStarshipList(searchParam);
    yield put(fetchStarShipListSuccess(starshipList));
  } catch (error) {
    yield put(fetchStarShipListFailure(error));
  }
}

export function* onFetchStarshipListStart() {
  yield takeLatest(starshipActionTypes.FETCH_STARSHIP_LIST_START, fetchStarshipList);
}

export function* starshipSagas() {
  yield all([
    call(onFetchStarshipListStart)
  ]);
}