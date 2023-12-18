export const USER_DATA = 'USER_DATA';
export const USER_SELECTED_LAT = 'USER_SELECTED_LAT';
export const USER_SELECTED_LONG = 'USER_SELECTED_LONG';

export const fetchUserData = data => ({
  type: USER_DATA,
  payload: data,
});

export const fetchUserLatitude = data => ({
  type: USER_SELECTED_LAT,
  payload: data,
});

export const fetchUserLongitude = data => ({
  type: USER_SELECTED_LONG,
  payload: data,
});
