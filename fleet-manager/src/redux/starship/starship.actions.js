// Action Types Import
import starshipActionTypes from "./starship.types";

export const fetchStarShipListStart = (searchParam) => ({
  type: starshipActionTypes.FETCH_STARSHIP_LIST_START,
  payload: searchParam
});

export const fetchStarShipListSuccess = (starshipList) => ({
  type: starshipActionTypes.FETCH_STARSHIP_LIST_SUCCESS,
  payload: starshipList,
});

export const fetchStarShipListFailure = (error) => ({
  type: starshipActionTypes.FETCH_STARSHIP_LIST_FAILURE,
  payload: error,
});

export const addStarshipInFleet = (starshipToAdd) => ({
  type: starshipActionTypes.ADD_STARSHIP_IN_FLEET,
  payload: starshipToAdd
});

export const removeStarshipFromFleet = (starshipToRemove) => ({
  type: starshipActionTypes.REMOVE_STARSHIP_FROM_FLEET,
  payload: starshipToRemove
});