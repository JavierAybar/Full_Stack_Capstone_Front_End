import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from './reducers/vehiclesSlice';

const store = configureStore({
  reducer: {
    vehicle: vehiclesReducer,
  },
});

export default store;
