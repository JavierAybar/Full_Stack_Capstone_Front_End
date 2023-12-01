import { configureStore } from '@reduxjs/toolkit';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';

const store = configureStore({
  reducer: {
    vehicleDetails: vehicleDetailsReducer,
  },
});

export default store;
