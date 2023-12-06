import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiURL = 'http://127.0.0.1:3000/api/v1/reservations/';

// Thunks
export const fetchReservations = createAsyncThunk(
  'reservation/fetchReservations',
  async () => {
    const response = await axios.get(`${apiURL}`);
    return response.data; // Assuming your API response directly contains the reservation data
  },
);

export const addReservation = createAsyncThunk(
  'reservation/addReservation',
  async (formData) => {
    const response = await axios.post(`${apiURL}`, {
      reservation: formData,
    }); // Assuming your API expects the reservation data wrapped in "reservation" object
    return response.data; // Assuming your API response directly contains the added reservation data
  },
);

export const deleteReservation = createAsyncThunk(
  'reservation/deleteReservation',
  async (reservId) => {
    await axios.delete(`${apiURL}${reservId}`);
    return reservId; // Return the deleted reservation's ID to update the state
  },
);

// Initial state
const initialState = {
  data: {
    name: 'a name',
    date: 'a date',
    city: 'a city',
  },
  status: 'idle',
  error: null,
};

// Slice
const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data.push(action.payload);
      })
      .addCase(deleteReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = state.data.filter(
          (reserv) => reserv.id !== action.payload,
        );
      })
      .addMatcher(
        (action) => [
          fetchReservations.rejected,
          addReservation.rejected,
          deleteReservation.rejected,
        ].includes(action.type),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        },
      );
  },
});

export default reservationSlice.reducer;
