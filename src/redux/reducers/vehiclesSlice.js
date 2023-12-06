import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1/vehicles';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  const response = await axios.get(url);
  return response.data;
});

const initialState = {
  vehicle: [],
  isLoading: true,
};

const vehiclesSlice = createSlice({
  name: 'vehicle',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVehicles.fulfilled, (state, action) => ({
      ...state,
      vehicle: action.payload,
    }));
  },
});

export default vehiclesSlice.reducer;
