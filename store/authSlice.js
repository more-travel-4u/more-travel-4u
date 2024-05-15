import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    first_name: '',
    last_name: '',
  },
  reducers: {
    setFirstName: (state, action) => {
      state.first_name = action.payload;
    },
    setLastName: (state, action) => {
      state.last_name = action.payload;
    },
  }
});

export const {
  setFirstName,
  setLastName
} = authSlice.actions;
export default authSlice.reducer;