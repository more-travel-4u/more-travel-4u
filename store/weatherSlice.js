import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    }
  }
})

export const {
  setCurrentWeather,
} = weatherSlice.actions;

export default weatherSlice.reducer;