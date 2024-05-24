import { createSlice } from "@reduxjs/toolkit";

export const eventSlice = createSlice({
  name: "event",
  initialState: {
    selectedPlannerDate: "",
  },
  reducers: {
    setSelectedPlannerDate: (state, action) => {
      state.selectedPlannerDate = action.payload;
    },
  }
})

export const {
  setSelectedPlannerDate,
} = eventSlice.actions;
export default eventSlice.reducer;