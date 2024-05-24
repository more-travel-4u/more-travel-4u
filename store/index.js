import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js"
import weatherReducer from "./weatherSlice.js";
import userReducer from "./userSlice.js";
import reservationSlice from './reservationSlice.js';
import tripReducer from "./tripSlice.js";
import eventReducer from "./eventSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    weather: weatherReducer,
    user: userReducer,
    reservation: reservationSlice,
    trip: tripReducer,
    event: eventReducer,
  },
});

export default store;