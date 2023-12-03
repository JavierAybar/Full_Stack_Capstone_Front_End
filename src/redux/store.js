import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehiclesSlice';
import vehicleDetailsReducer from './vehicle_details/vehicleDetailsSlice';
import reservationReducer from './reservation/reservSlice';

const store = configureStore({
  reducer: {
    vehicle: vehiclesReducer,
    vehicleDetails: vehicleDetailsReducer,
    reservation: reservationReducer,
  },
});

export default store;
