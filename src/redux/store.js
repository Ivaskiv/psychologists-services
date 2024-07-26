// src/redux/store.js

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './auth/authSlice';
import { psychologistsReducer } from './psychologitsts/psychologistsSlice';
import favoritesReducer from './favorites/favoritesSlice';
const favoritesConfig = {
  key: 'favorites',
  storage,
  whitelist: ['items'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  psychologists: psychologistsReducer,
  favorites: persistReducer(favoritesConfig, favoritesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
