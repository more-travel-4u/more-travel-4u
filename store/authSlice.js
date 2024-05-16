import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    username: '',
    password: '',
    email: '',
    token: null,
    authMessage: '',
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthMessage: (state, action) => {
      state.authMessage = action.payload;
    },
    clearAuth: (state) => {
      state.username = '';
      state.password = '';
      state.email = '';
      state.token = null;
      state.message = '';
    },
    clearPassword: (state) => {
      state.password = '';
    }
  }
});

export const {
  setUsername,
  setPassword,
  setEmail,
  setToken,
  setAuthMessage,
  clearAuth,
  clearPassword
} = authSlice.actions;
export default authSlice.reducer;