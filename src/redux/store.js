import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehiclesSlice';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';

const store = configureStore({
  reducer: {
    vehicle: vehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
  },
});

export default store;
