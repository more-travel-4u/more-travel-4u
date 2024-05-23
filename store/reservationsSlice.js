import { createSlice } from "@reduxjs/toolkit";


setReservation, updateReservation, checkIn, checkOut, itineraryNumber, confirmationNumber, hotelAddress, hotelName, agreedRate
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
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserMessage: (state, action) => {
      state.userMessage = action.payload;
    },
    setUser: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    clearAll: (state) => {
      state.username = "";
      state.id = "";
      state.email = "";
      state.token = "";
      state.userMessage = "";
    }
  }
})

export const {
  setUsername,
  setEmail,
  setId,
  setPassword,
  setToken,
  setUserMessage,
  setUser,
  clearAll,
} = userSlice.actions;
export default userSlice.reducer;