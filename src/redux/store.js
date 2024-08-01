import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import psychologistsReducer from './psychologitsts/psychologistsSlice';
import favoritesReducer from './psychologitsts/psychologistsSlice';

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
import { thunk } from 'redux-thunk'; // Імпорт thunk без default

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Тільки auth зберігається
};

const favoritesConfig = {
  key: 'favorites',
  storage,
  whitelist: ['favoriteIds'],
};

const rootReducer = combineReducers({
  auth: authReducer,
  psychologists: psychologistsReducer,
  favorites: persistReducer(favoritesConfig, favoritesReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export const persistor = persistStore(store);
