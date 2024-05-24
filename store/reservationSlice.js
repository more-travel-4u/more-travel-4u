import { createSlice } from "@reduxjs/toolkit";

export const reservationSlice = createSlice({
  name: "user",
  initialState: {
    checkIn: "",
    checkOut: "",
    intineraryNumber: "",
    confirmationNumber: "",
    hotelAddress: "",
    hotelName: "",
    agreedRate: ""
  },
  reducers: {
    setReservation: (state, action) => {
      state.reservationSlice = action.payload;
    },
    updateReservation: (state, action) => {
      state.updateReservation = action.payload;
    },
    checkIn: (state, action) => {
      state.checkIn = action.payload;
    },
    checkOut: (state, action) => {
      state.checkOut = action.payload;
    },
    intineraryNumber: (state, action) => {
      state.intineraryNumber = action.payload;
    },
    confirmationNumber: (state, action) => {
      state.confirmationNumber = action.payload;
    },
    hotelAddress: (state, action) => {
      state.hotelAddress = action.payload;
    },
    hotelName: (state, action) => {
      state.hotelName = action.payload;
    },
    agreedRate: (state, action) => {
      state.agreedRate = action.payload
    },

    clearAll: (state) => {
      state.setReservation = "";
      state.updateReservation = "";
      state.checkIn = "",
      state.checkOut = "";
      state.intineraryNumber = "";
      state.hotelAddress = "";
      state.hotelName = "";
      state.agreedRate = "";
    }
  }
})

export const {
  setReservation,
  updateReservation,
  checkIn,
  checkOut,
  intineraryNumber,
  hotelAddress,
  hotelName,
  agreedRate,
  clearAll,
} = reservationSlice.actions

export default reservationSlice.reducer;