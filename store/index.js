import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import weatherReducer from "./weatherSlice.js";
import userReducer from "./userSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    user: userReducer,
  },
});

export default store;