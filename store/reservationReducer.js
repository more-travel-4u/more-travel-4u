import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkIn: '',
  checkOut: '',
  itineraryNumber: '',
  confirmationNumber: '',
  hotelAddress: '',
  hotelName: '',
  agreedRate: '',
};

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    setReservation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    updateReservation: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const { setReservation, updateReservation } = reservationSlice.actions;
export default reservationSlice.reducer;