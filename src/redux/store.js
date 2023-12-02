import { configureStore } from '@reduxjs/toolkit';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
  },
});

export default store;
