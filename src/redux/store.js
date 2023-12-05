import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehiclesSlice';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    vehicle: vehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    auth: authReducer,
  },
});

export default store;
