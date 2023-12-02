import { configureStore } from '@reduxjs/toolkit';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';
import vehicleDetailsReducer from './reservation/reservSlice';

const store = configureStore({
  reducer: {
    vehicleDetails: vehicleDetailsReducer,
    reservation: reservSliceReducer
  },
});

export default store;
