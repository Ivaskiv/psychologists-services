import { createSlice } from '@reduxjs/toolkit';
import { login, logout } from './authOperation';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: state => {
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(register.fulfilled, (state, action) => {
        console.log('User registered in Redux:', action.payload); // Логування даних користувача
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log('User logged in Redux:', action.payload); // Логування даних користувача
        state.user = action.payload;
        state.status = 'succeeded';
      })
      .addCase(logout.fulfilled, state => {
        console.log('User logged out from Redux'); // Логування при виході
        state.user = null;
        state.status = 'idle';
      });
  },
});
export const { setUser, clearUser } = authSlice.actions;
export const selectUser = state => state.auth.user;
export const selectAuthStatus = state => state.auth.status;

export default authSlice.reducer;
