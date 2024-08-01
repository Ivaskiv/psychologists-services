import { createSlice } from '@reduxjs/toolkit';
import { fetchPsychologists } from './psychologistsOperation';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    data: [],
    favoriteIds: [],
    currentPage: 1,
    totalPages: 1,
    filter: ' ',
    status: 'idle', // Додаємо статус для асинхронних запитів
    error: null,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload ?? state.currentPage + 1;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    resetState: state => {
      state.data = [];
      state.currentPage = 1;
      state.totalPages = 1;
      state.filter = ' ';
      state.status = 'idle';
      state.error = null;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addFavoriteId: (state, action) => {
      const id = action.payload;
      if (!state.favoriteIds.includes(id)) {
        state.favoriteIds.push(id);
        // Optionally save to localStorage here if needed
      }
    },
    removeFavoriteId: (state, action) => {
      const id = action.payload;
      state.favoriteIds = state.favoriteIds.filter(favId => favId !== id);
      // Optionally save to localStorage here if needed
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPsychologists.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchPsychologists.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchPsychologists.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage, setTotalPages, resetState, setFilter, addFavoriteId, removeFavoriteId } =
  psychologistsSlice.actions;

export const { setPsychologists } = psychologistsSlice.actions;

export default psychologistsSlice.reducer;
