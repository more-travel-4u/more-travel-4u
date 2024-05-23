const SET_RESERVATION = 'SET_RESERVATION';
const UPDATE_RESERVATION = 'UPDATE_RESERVATION';

export const setReservation = (reservation) => ({
  type: SET_RESERVATION,
  payload: reservation,
});

export const updateReservation = (reservation) => ({
  type: UPDATE_RESERVATION,
  payload: reservation,
});