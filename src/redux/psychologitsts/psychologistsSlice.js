import { createSlice } from '@reduxjs/toolkit';

const psychologistsSlice = createSlice({
  name: 'psychologists',
  initialState: {
    data: [],
    currentPage: 1,
    itemsPerPage: 3,
    filter: ' ',
  },
  reducers: {
    setPsychologists: (state, action) => {
      state.data = action.payload;
    },
    setPage: state => {
      state.currentPage += 1;
    },
    resetState: state => {
      state.data = [];
      state.currentPage = 1;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setPsychologists, setPage, resetState, setFilter } = psychologistsSlice.actions;

export const selectPsychologists = state => state.psychologists.data;
export const selectCurrentPage = state => state.psychologists.currentPage;
export const selectItemsPerPage = state => state.psychologists.itemsPerPage;
export const selectFilter = state => state.psychologists.filter;

export const psychologistsReducer = psychologistsSlice.reducer;
