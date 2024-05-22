import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import weatherReducer from "./weatherSlice.js";
import userReducer from "./userSlice.js";
import { combineReducers } from 'redux';
import reservationReducer from './reservationReducer.js';




const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    user: userReducer,
  },
  rootReducer: {
    rootReducer: combineReducers,
    user: userReducer,
    reservation: reservationReducer,
  },
});

export default store;