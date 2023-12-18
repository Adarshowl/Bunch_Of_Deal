// IMPORT ALL CONSTANT STRINGS DEFINED IN action file == ../actions/Camp.js
import {
  USER_DATA,
  USER_SELECTED_LAT,
  USER_SELECTED_LONG,
} from '../actions/index';

const initialState = {
  userData: {},
  latitude: 0.0,
  longitude: 0.0,
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case USER_SELECTED_LAT:
      return {
        ...state,
        latitude: action.payload,
      };
    case USER_SELECTED_LONG:
      return {
        ...state,
        longitude: action.payload,
      };
    default:
      return state;
  }
};
export default Reducer;
