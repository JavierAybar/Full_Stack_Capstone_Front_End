import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '../../services/AuthService';

export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({ email, password }) => {
    const response = await AuthService.login(email, password);
    return response;
  },
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async () => {
    const response = await AuthService.logout();
    return response;
  },
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({
    username, email, password, passwordConfirmation,
  }) => {
    const response = await AuthService.register(username, email, password, passwordConfirmation);
    return response;
  },
);

const initialState = {
  user: null,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
  extraReducers: {
    [authenticateUser.pending]: (state) => {
      state.loading = true;
    },
    [authenticateUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [authenticateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [logoutUser.fulfilled]: (state) => {
      state.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.error = null;
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const { updateUser } = authSlice.actions;

export default authSlice.reducer;
