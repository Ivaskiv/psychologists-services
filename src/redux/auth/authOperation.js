import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth, signInWithCustomToken } from '../../firebase/firebaseConfig';
import axios from 'axios';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    console.log('Attempting login with:', email, password);
    if (!email || !password) {
      return rejectWithValue('Email and password are required');
    }
    try {
      const response = await axios.post('http://localhost:3000/login', { email, password });
      const { token } = response.data;
      await signInWithCustomToken(auth, token);
      const user = auth.currentUser;

      console.log('Login successful:', user);
      return {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
      };
    } catch (error) {
      console.error('Login error:', error.message);
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
