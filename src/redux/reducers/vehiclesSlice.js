import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${url}api/v1/vehicles`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.vehicles);
  }
});

const initialState = {
  vehicles: [],
  isLoading: true,
};

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.vehicles = action.payload.vehicles;
        state.isLoading = false;
        console.log(state.vehicles);
      });
  },
});

export default vehiclesSlice.reducer;
