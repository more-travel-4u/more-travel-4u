import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import weatherReducer from "./weatherSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
  },
});

export default store;