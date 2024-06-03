import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    selectedPlannerDate: "",
    _modeFAB: "date",
    _showFAB: false,
    newEventDate: null,
    eventLocation: "",
  },
  reducers: {
    setSelectedPlannerDate: (state, action) => {
      state.selectedPlannerDate = action.payload;
    },
    set_modeFAB: (state, action) => {
      state._modeFAB = action.payload;
    },
    set_showFAB: (state, action) => {
      state._showFAB = action.payload;
    },
    setNewEventDate: (state, action) => {
      state.newEventDate = action.payload;
    },
    setEventLocation: (state, action) => {
      state.eventLocation = action.payload;
    }
  }
})

export const {
  setSelectedPlannerDate,
  set_modeFAB,
  set_showFAB,
  setNewEventDate,
  setEventLocation,
} = eventSlice.actions;
export default eventSlice.reducer;