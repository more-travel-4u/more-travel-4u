import { SET_RESERVATION, UPDATE_RESERVATION } from "../store/reservationReducer.js";

const setReservation = (reservation) => ({
  type: SET_RESERVATION,
  payload: reservation,
});

const updateReservation = (reservation) => ({
  type: UPDATE_RESERVATION,
  payload: reservation,
});

const initialState = {
  checkIn: '',
  checkOut: '',
  itineraryNumber: '',
  confirmationNumber: '',
  hotelAddress: '',
  hotelName: '',
  agreedRate: ''
};

const reservationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RESERVATION:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_RESERVATION:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reservationReducer; updateReservation; setReservation;