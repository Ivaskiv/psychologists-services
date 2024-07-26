import { createSelector } from 'reselect';

// отримати список з Redux
export const selectPsychologistsState = state => state.psychologists;

// Селектор для отримання списку психологів
export const selectPsychologists = createSelector(
  [selectPsychologistsState],
  psychologistsState => psychologistsState.items || []
);

// Селектор для отримання статусу запиту
export const selectPsychologistsStatus = createSelector(
  [selectPsychologistsState],
  psychologistsState => psychologistsState.status
);

// Селектор для отримання помилок
export const selectPsychologistsError = createSelector(
  [selectPsychologistsState],
  psychologistsState => psychologistsState.error
);

// Селектор для отримання поточної сторінки
export const selectCurrentPage = createSelector(
  [selectPsychologistsState],
  psychologistsState => psychologistsState.currentPage
);

// Селектор для отримання кількості психологів
export const selectTotalCount = createSelector(
  [selectPsychologistsState],
  psychologistsState => psychologistsState.totalCount
);

// Селектор для перевірки, чи є ще психологи для завантаження
export const selectHasMorePsychologists = createSelector(
  [selectPsychologistsState],
  psychologistsState => {
    const items = psychologistsState.items || [];
    return items.length < psychologistsState.totalCount;
  }
);
