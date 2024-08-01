import { createSelector } from 'reselect';

export const selectPsychologists = state => state.psychologists.data;

export const selectCurrentPage = state => state.psychologists.currentPage;

export const selectItemsPerPage = state => state.psychologists.itemsPerPage;

export const selectFilter = state => state.psychologists.filter;

export const selectTotalPages = state => state.psychologists.totalPages;

// Основний селектор для отримання всіх психологів
const selectAllPsychologists = state => state.psychologists.data;

// Мемоїзований селектор для отримання улюблених психологів
export const selectFavoritePsychologists = createSelector(
  [selectAllPsychologists, state => state.psychologists.favoriteIds],
  (psychologists, favoriteIds) => {
    return psychologists.filter(psychologist => favoriteIds.includes(psychologist.id));
  }
);
