import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    console.log('Attempting login with:', email, password); // Логування спроби логіну
    if (!email || !password) {
      return rejectWithValue('Email and password are required');
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user); // Логування успішного логіну
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
      };
    } catch (error) {
      console.error('Login error:', error.message); // Логування помилки
      return rejectWithValue(error.message);
    }
  }
);
export const register = createAsyncThunk(
  'auth/register',
  async ({ email, password, displayName }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName });
      return {
        displayName: userCredential.user.displayName,
        uid: userCredential.user.uid,
        providerId: userCredential.user.providerId,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
    return {};
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
