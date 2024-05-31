import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import weatherReducer from "./weatherSlice.js";
import userReducer from "./userSlice.js";
import { combineReducers } from 'redux';
import reservationSlice from './hotelSlice.js';




const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    user: userReducer,
    reservation: reservationSlice,
  },
});

export default store;