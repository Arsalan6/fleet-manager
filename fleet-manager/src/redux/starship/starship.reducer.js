import starshipActionTypes from './starship.types';

const INITIAL_STATE = {
  starshipList: [],
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
    default:
      return state;
  }
}

export default starshipReducer;
