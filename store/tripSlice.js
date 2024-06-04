import { createSlice } from "@reduxjs/toolkit";

export const tripSlice = createSlice({
  name: "trip",
  initialState: {
    activeTrip: null,
    activeTripCompanions: [],
  },
  reducers: {
    setActiveTrip: (state, action) => {
      state.activeTrip = action.payload;
    },
    clearActiveTrip: (state) => {
      state.activeTrip = null;
    },
    setActiveTripCompanions: (state) => {
      state.activeTripCompanions = state.activeTrip.users_trips.map(userObj => userObj.users)
    },
    resetActiveTripCompanions: (state) => {
      state.activeTripCompanions = [];
    }
  }
})

export const {
  setActiveTrip,
  clearActiveTrip,
  setActiveTripCompanions,
  resetActiveTripCompanions
} = tripSlice.actions;
export default tripSlice.reducer;