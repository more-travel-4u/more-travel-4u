import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    selectedPlannerDate: "",
    _modeFAB: "date",
    _showFAB: false
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
  }
})

export const {
  setSelectedPlannerDate,
  set_modeFAB,
  set_showFAB
} = eventSlice.actions;
export default eventSlice.reducer;