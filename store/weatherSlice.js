import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    errorMessage: "",
  },
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    }
  }
})

export const {
  setCurrentWeather,
  setErrorMessage
} = weatherSlice.actions;

export default weatherSlice.reducer;