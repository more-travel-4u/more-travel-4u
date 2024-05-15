import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"

// // Handles different action types and update the state accordingly
// const reducer = (state = initialState, action) => {

// };

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;