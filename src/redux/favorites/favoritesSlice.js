// src/redux/favorites/favoritesSlice.js

import { createSlice } from '@reduxjs/toolkit';

const favoritesInitialState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: favoritesInitialState,
  reducers: {
    addItem(state, action) {
      state.items.push(action.payload);
    },
    deleteItem(state, action) {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetItems(state) {
      state.items = [];
    },
  },
});

export const { addItem, deleteItem, resetItems } = favoritesSlice.actions;
export const selectFavorites = state => state.favorites.items;
export default favoritesSlice.reducer;
