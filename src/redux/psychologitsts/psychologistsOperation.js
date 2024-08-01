import { createAsyncThunk } from '@reduxjs/toolkit';
import { ref, get } from 'firebase/database'; // Використовуйте get замість onValue для одноразового отримання даних
import { db } from '../../firebase/firebaseConfig';
import { setPsychologists } from './psychologistsSlice';

// Використовуємо createAsyncThunk для створення асинхронного запиту
export const fetchPsychologists = createAsyncThunk(
  'psychologists/fetchPsychologists',
  async (page = 1, { dispatch, getState }) => {
    const { filter } = getState().psychologists;
    const dataRef = ref(db, '/');

    try {
      const snapshot = await get(dataRef);

      if (!snapshot.exists()) {
        return [];
      }

      const data = snapshot.val();

      if (!data || typeof data !== 'object') {
        return [];
      }

      // Формуємо масив психологів з унікальними id
      const psychologistsArray = Object.entries(data).map(([key, value]) => ({
        ...value,
        id: key, // Використовуємо ключ як унікальний id
      }));

      // Застосовуємо фільтр
      const filteredPsychologists = psychologistsArray.filter(psychologist => {
        return filter === ' ' || psychologist.someField === filter;
      });

      return filteredPsychologists;
    } catch (error) {
      console.error('Error fetching psychologists:', error);
      throw error;
    }
  }
);
