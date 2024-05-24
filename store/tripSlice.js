import { createSlice } from "@reduxjs/toolkit";

export const tripSlice = createSlice({
  name: "trip",
  initialState: {
    activeTrip: null,
  },
  reducers: {
    setActiveTrip: (state, action) => {
      state.activeTrip = action.payload;
    },
    clearActiveTrip: (state) => {
      state.activeTrip = null;
    },
  }
})

export const {
  setActiveTrip,
  clearActiveTrip,
} = tripSlice.actions;
export default tripSlice.reducer;