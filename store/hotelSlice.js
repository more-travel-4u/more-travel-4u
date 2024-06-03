import { createSlice } from "@reduxjs/toolkit";

export const hotelSlice = createSlice({
  name: "user",
  initialState: {
    hotelDetails: `${'hotel_id=1377073&locale=en-gb'}`,
  },
  reducers: {
    hotelDetails: (state, action) => {
      state.hotelDetails = action.payload;
    },

    clearAll: (state) => {
      state.hotelDetails = `${data = 'hotel_id=1377073&locale=en-gb'}`
    }
  }
})

export const {
  name, initialState, reducers,
} = hotelSlice.actions;

export default hotelSlice.reducer;