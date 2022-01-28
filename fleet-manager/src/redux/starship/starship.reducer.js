import starshipActionTypes from './starship.types';

const INITIAL_STATE = {
  starshipList: [],
  userFleet: [],
  error: null,
  loading: false,
};

const starshipReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case starshipActionTypes.FETCH_STARSHIP_LIST_START:
      return {
        ...state,
        starshipList: [],
        error: null,
        loading: true,
      };
    case starshipActionTypes.FETCH_STARSHIP_LIST_SUCCESS:
      return {
        ...state,
        starshipList: action.payload,
        error: null,
        loading: false,
      };
    case starshipActionTypes.FETCH_STARSHIP_LIST_FAILURE:
      return {
        ...state,
        starshipList: [],
        error: action.payload,
        loading: false,
      };
    case starshipActionTypes.ADD_STARSHIP_IN_FLEET:
      return {
        ...state,
        userFleet: state.userFleet.some(fleetship => fleetship.url === action.payload.url) ?
          state.userFleet : [action.payload, ...state.userFleet],
      };
    case starshipActionTypes.REMOVE_STARSHIP_FROM_FLEET:
      return {
        ...state,
        userFleet: state.userFleet.filter(fleetShip => fleetShip.url !== action.payload.url),
      };
    default:
      return state;
  }
}

export default starshipReducer;
