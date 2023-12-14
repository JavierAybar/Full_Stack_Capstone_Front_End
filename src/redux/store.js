import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehiclesSlice';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';
import authReducer from './slices/authSlice';
import reservationReducer from './reservation/reservSlice';

const store = configureStore({
  reducer: {
    vehicle: vehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    reservation: reservationReducer,
    auth: authReducer,
  },
});

export default store;
