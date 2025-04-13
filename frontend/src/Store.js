import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage as the default storage
import { combineReducers } from 'redux';
import mylogin from './Features/Login/Loginslice';
import cartReducer from './Features/Shop/Shopslice';

// Combine reducers
const rootReducer = combineReducers({
  login: mylogin,
  cart: cartReducer,
});

// Persist configuration
const persistConfig = {
  key: 'root', // Key for the persisted state
  storage, // Use localStorage
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
export const persistor = persistStore(store);

export default store;