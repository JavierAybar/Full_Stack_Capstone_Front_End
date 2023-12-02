import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:3000/api/v1';

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  const response = await axios.get(`${url}/vehicles`);
  return response.data;
});

export const deleteVehicle = createAsyncThunk('vehicles/deleteVehicle', async (id) => {
  await axios.delete(`${url}/vehicles/${id}`);
  return id;
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
    builder
      .addCase(fetchVehicles.fulfilled, (state, action) => ({
        ...state,
        vehicle: action.payload,
      }))
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.vehicle = state.vehicle.filter((vehicle) => vehicle.id !== action.payload);
      });
  },
});
export default vehiclesSlice.reducer;
